/**
 * @since 06-05-2024 16:52:10
 */

import { useSdk } from "@hooks/use-sdk";
import initLogger from "@lib/logging";
import { AxiosProgressEvent } from "axios";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Tooltip from "rc-tooltip";
import { createFileObjectFromRemote } from "@lib/utilities/files";
import Icons from "@/features/admin/ui/icons";
import { Button } from "@/components/ui/button";

const logger = initLogger("COMPONENT", "UPLOADER");

export const PREDEFINED_ACCEPTED_FILES = {
  excel: {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    "application/vnd.ms-excel": [],
  },
  word: {
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
  },
  pdf: {
    "application/pdf": [],
  },
  images: {
    "image/*": [],
    "image/jpeg": [],
    "image/png": [],
    "image/webp": [],
  },
  videos: {
    "video/*": [],
    "video/mp4": [],
    "video/quicktime": [],
  },
  text: {
    "text/plain": [],
  },
  audio: {
    "audio/*": [],
    "audio/mpeg": [],
    "audio/mp3": [],
    "audio/wav": [],
  },
  compressed: {
    "application/zip": [],
    "application/x-rar-compressed": [],
    "application/x-gzip": [],
    "application/x-7z-compressed": [],
    "application/x-tar": [],
    "application/x-bzip2": [],
  },
};

export type UploadFileDatum = File & {
  preview: string;
  previewRevoked: boolean;
  error: Levelup.CMS.V1.Utils.Api.Response.Error | null;
  status: "not_uploaded" | "uploading" | "uploaded" | "failed";
  percentage: number;
  dbRecord: Levelup.CMS.V1.Storage.Entity.UploadedFile | null;
};

type Props<IsMulti extends boolean = true> = {
  multiple?: IsMulti;
  accept: { [key: string]: string[] };
  canUpload?: boolean;
  autoUpload?: boolean;
  showUploadButton?: boolean;
  defaultValue?: IsMulti extends true
    ? Levelup.CMS.V1.Storage.Entity.UploadedFile[]
    : Levelup.CMS.V1.Storage.Entity.UploadedFile | null;
  /**
   * Memoise this function using useCallback to avoid unnecessary re-renders
   */
  onChange?: IsMulti extends true
    ? (value: {
        files: UploadFileDatum[];
        uploaded: {
          index: number;
          dbRecord: Levelup.CMS.V1.Storage.Entity.UploadedFile;
        }[];
      }) => void
    : (value: {
        file: UploadFileDatum | null;
        dbRecord: Levelup.CMS.V1.Storage.Entity.UploadedFile | null;
      }) => void;

  onMoveFile?: (prevIndex: number, currIndex: number) => void;
  content?: React.ReactNode;
};

// const circumference = 11 * 2 * Math.PI;

const FileUploader = <IsMulti extends boolean = true>({
  multiple,
  canUpload = true,
  autoUpload = false,
  showUploadButton = true,
  defaultValue,
  onChange,
  accept,
  content,
}: Props<IsMulti>): JSX.Element => {
  // TOOLS
  const { t: tLabel } = useTranslation("label");
  const { t: tMessage } = useTranslation("message");
  const { t: tError } = useTranslation("error");

  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [selectedFiles, setSelectedFiles] = useState<UploadFileDatum[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [fileInfos, setFileInfos] = useState<any[]>([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept,
      multiple,
      onDrop: acceptedFiles => {
        const files: UploadFileDatum[] = acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            previewRevoked: false,
            error: null,
            status: "not_uploaded" as const,
            percentage: 0,
            dbRecord: null,
          }),
        );
        logger.debug("calling on change...");
        setSelectedFiles(old => (multiple ? [...old, ...files] : files));
      },
    });

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const upload = useCallback(
    async (idx: number, file: UploadFileDatum) => {
      try {
        const { data } = await sdk.storage.upload(
          file,
          (event: AxiosProgressEvent) => {
            const percentage = Math.round(
              (100 * event.loaded) / (event.total || 1),
            );
            logger.event("PROGRESS", file.name, percentage);
            setSelectedFiles(old =>
              [...old].map((file, index) =>
                index === idx
                  ? Object.assign(file, {
                      percentage,
                      status: percentage === 100 ? "uploaded" : "uploading",
                    })
                  : file,
              ),
            );
          },
        );

        setSelectedFiles(old =>
          [...old].map((file, index) =>
            index === idx
              ? Object.assign(file, {
                  dbRecord: data?.files[0] || null,
                  status: "uploaded",
                })
              : file,
          ),
        );
      } catch (error) {
        logger.error("Catched upload error", error);
        setSelectedFiles(old =>
          old.map((file, index) =>
            index === idx
              ? Object.assign(file, {
                  status: "failed",
                  error: error as any,
                })
              : file,
          ),
        );
      }
    },
    [sdk.storage],
  );

  const uploadFiles = useCallback(
    (files: UploadFileDatum[]) => {
      logger.event(
        "Uploading files",
        files.map(file => file.name),
      );
      for (let i = 0; i < files.length; i++) {
        if (files[i].status === "not_uploaded") {
          logger.debug("Uploading file", files[i].name);
          upload(i, files[i]);
        } else logger.debug("Ignoring file", files[i].name, files[i].status);
      }
    },
    [upload],
  );

  const loadServerFile = useCallback(
    async (
      dbRecord: Levelup.CMS.V1.Storage.Entity.UploadedFile,
    ): Promise<UploadFileDatum> => {
      const file = await createFileObjectFromRemote(
        sdk.storage.getFileUrl(dbRecord._id),
        dbRecord.file_name,
      );
      return Object.assign(file, {
        preview: "",
        previewRevoked: true,
        error: null,
        status: "uploaded" as const,
        percentage: 100,
        dbRecord,
      });
    },
    [sdk.storage],
  );
  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    logger.debug("Selected files updated", selectedFiles);
    selectedFiles.forEach(file => {
      if (!file.previewRevoked) URL.revokeObjectURL(file.preview);
    });
    if (autoUpload) uploadFiles(selectedFiles);
    if (onChange) {
      const value = {
        files: selectedFiles,
        uploaded: selectedFiles
          .map((file, index) => ({
            dbRecord: file.dbRecord,
            index,
          }))
          .filter(v => v.dbRecord !== null) as any[],
      };
      logger.event("Calling onChange", value);
      if (multiple) {
        onChange(value as any);
      } else {
        onChange({
          file: value.files[0] || null,
          dbRecord: value.uploaded[0]?.dbRecord || null,
        } as any);
      }
    }
  }, [selectedFiles, autoUpload, uploadFiles, onChange, multiple]);

  useEffect(() => {
    logger.event("CHARGING DEFAULT VALUE FILES");
    const values: Levelup.CMS.V1.Storage.Entity.UploadedFile[] =
      defaultValue instanceof Array
        ? defaultValue
        : defaultValue
          ? [defaultValue]
          : [];
    const injectedFiles = [
      ...selectedFiles
        .filter(f => f.status === "uploaded")
        .map(f => f.dbRecord?._id),
      ...deletedFiles,
    ];
    if (values.filter(v => !injectedFiles.includes(v._id)).length) {
      const promises = values
        .filter(v => !injectedFiles.includes(v._id))
        .map(v => loadServerFile(v));
      Promise.all(promises).then(result => {
        logger.value("CHARGING DEFAULT VALUE FILES", result);
        setSelectedFiles(old => [...old, ...result]);
      });
    }
  }, [defaultValue, loadServerFile, selectedFiles, deletedFiles]);

  return (
    <section
      className={clsx(
        "rounded-lg border-2 border-dashed text-center",
        !isDragActive && "cursor-pointer border-gray-200 text-gray-500",
        isDragActive &&
          !isDragReject &&
          "cursor-grab border-sky-200 bg-sky-50 text-sky-500",
        isDragReject &&
          "cursor-not-allowed border-red-200 bg-red-50 text-red-500",
      )}
    >
      <div
        {...getRootProps({ className: "dropzone" })}
        className="cursor-pointer rounded-lg p-6"
      >
        <input {...getInputProps()} />
        {content}
        <p className={clsx("p-6")}>
          {!isDragActive && tMessage("Click here or drop a file to upload!")}
          {isDragActive && !isDragReject && tMessage("Drop it like it's hot!")}
          {isDragReject && tMessage("File type not accepted, sorry!")}
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <aside className="space-y-2 p-4">
          {selectedFiles.map((file, index) => (
            <div
              className="relative flex cursor-auto items-center space-x-4 rounded-md border border-gray-100 bg-white/50 px-4 py-2 text-left"
              key={`${file.name}-${index}`}
            >
              {file.status === "failed" ? (
                <Tooltip overlay={tError(file.error?.message || "")}>
                  <span className="h-7 w-7 rounded-full text-red-500">
                    <Icons.Alert.ErrorOutline className="h-7 w-7" />
                  </span>
                </Tooltip>
              ) : file.percentage === 100 ? (
                <span className="h-7 w-7 rounded-full bg-green-500 p-1">
                  <Icons.Check className="h-5 w-5 text-white" />
                </span>
              ) : (
                <span className="h-7 w-7 rounded-full p-0">
                  <svg className="h-7 w-7 -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="transparent"
                      r="11"
                      cx="14"
                      cy="14"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="3"
                      strokeDasharray={11 * 2 * Math.PI}
                      strokeDashoffset={
                        11 * 2 * Math.PI -
                        ((file.percentage || 0) / 100) * (11 * 2 * Math.PI)
                      }
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="11"
                      cx="14"
                      cy="14"
                    />
                  </svg>
                  {/* <span className="absolute text-xl text-green-700">{index} {`${progressInfos[index].percentage}%`}</span> */}
                </span>
              )}

              <span
                className={`flex flex-grow flex-col truncate text-sm ${file.error && "text-red-700"}`}
              >
                <span>{file.name}</span>
                {file.error && (
                  <span className="text-xs text-red-500">
                    {file.error.message}
                  </span>
                )}
              </span>

              <button
                onClick={e => {
                  setDeletedFiles(old => [...old, file.dbRecord?._id || ""]);
                  setSelectedFiles(old =>
                    [...old].filter((f, i) => i !== index),
                  );
                }}
                className="cursor-pointer text-red-300 hocus:text-red-600"
              >
                <Icons.CloseFillCircle className="h-7 w-7" />
              </button>
            </div>
          ))}
        </aside>
      )}

      {canUpload && !autoUpload ? (
        <aside className="flex justify-center p-4">
          <Button
            className="btn btn-primary"
            disabled={!selectedFiles.length}
            onClick={() => uploadFiles(selectedFiles)}
          >
            {tLabel("Upload")}
          </Button>
        </aside>
      ) : null}
    </section>
  );
};

export default FileUploader;

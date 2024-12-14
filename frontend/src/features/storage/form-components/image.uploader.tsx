import { useSdk } from "@hooks/use-sdk";
import initLogger, { LoggerContext } from "@lib/logging";
import clsx from "clsx";
import Image from "next/image";
import React, { FC, useCallback, useEffect, useState } from "react";
import { type DropEvent, useDropzone } from "react-dropzone";

import Icons from "@/features/admin/ui/icons";

const logger = initLogger(LoggerContext.COMPONENT, "ImageUploader");

type Props = {
  value?: Levelup.CMS.V1.Utils.Common.FileAttribute;
  onUpload?: (results: Levelup.CMS.V1.Storage.Entity.UploadedFile) => void;
  onRemove?: () => void;
  imageRatio?: number;
  containerClassname?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  placeholder?: React.ReactNode;
};

const circumference = 17 * 2 * Math.PI;

const ImageUploader: FC<Props> = ({
  value,
  onUpload,
  onRemove,
  imageRatio = 1,
  containerClassname = "",
  dimensions,
  placeholder,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [selectedFile, setSelectedFile] = useState<
    | (File & {
      preview: string;
      new: boolean;
    })
    | null
  >(null);
  const [progressInfos, setProgressInfos] = useState<{
    percentage?: number;
    fileName?: string;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] =
    useState<Levelup.CMS.V1.Storage.Entity.UploadedFile | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                  DROPZONE                                  */
  /* -------------------------------------------------------------------------- */
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
        "image/jpeg": [],
        "image/png": [],
      },
      multiple: false,
      onDrop: (acceptedFiles, fileRejections, event: DropEvent) => {
        const file = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
          new: true,
        });
        logger.value("accepted files", acceptedFiles, file);
        upload(file);
        setSelectedFile(file);
        setPreview(URL.createObjectURL(acceptedFiles[0]));
      },
    });

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const upload = useCallback(
    (
      file: File & {
        preview: string;
        new: boolean;
      },
    ) => {
      logger.debug("uploading file", file);
      if (!file || !file.new) return;
      let _progressInfos = { percentage: 0, fileName: file.name };
      logger.event("Uploading", file);
      setProgressInfos(_progressInfos);
      setProcessing(true);
      setUploadedFile(null);
      sdk.storage
        .upload(file, event => {
          const percentage = Math.round(
            (100 * event.loaded) / (event.total || 1),
          );
          console.log("PROGRESS", percentage);
          _progressInfos.percentage = percentage;
          setProgressInfos(_progressInfos);
        })
        .then(response => {
          setMessage("Uploaded the file successfully: " + file.name);
          if (response.data.files?.length) {
            onUpload && onUpload(response.data.files[0]);
            setUploadedFile(response.data.files[0]);
          }
          setProcessing(false);
        })
        .catch(error => {
          console.log(error);
          _progressInfos.percentage = 0;
          setMessage("Could not upload the file: " + file.name);
          setProgressInfos(_progressInfos);
          setProcessing(false);
        });
    },
    [onUpload, sdk.storage],
  );

  /* -------------------------------------------------------------------------- */
  /*                                EFFECT HOOKS                                */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (selectedFile) {
      // Make sure to revoke the data uris to avoid memory leaks
      setTimeout(() => {
        URL.revokeObjectURL(selectedFile.preview);
      }, 300);

      console.log("file", selectedFile);
      setProgressInfos({
        fileName: selectedFile.name,
        percentage: 0,
      });
    } else {
      setProgressInfos({
        fileName: "",
        percentage: 0,
      });
    }
  }, [selectedFile]);

  useEffect(() => {
    logger.debug("PREVIEW", preview);
  }, [preview]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <section className="text-center">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="inline-block cursor-pointer w-full"
      >
        <input {...getInputProps()} />
        <aside className="mt-2 flex flex-wrap">
          <div
            className={clsx(
              "relative inline-flex max-w-full border border-dashed border-gray-200 p-1",
              containerClassname,
            )}
          >
            <div className="relative flex w-full min-w-0 overflow-hidden rounded-md">
              {placeholder &&
                !uploadedFile &&
                !selectedFile?.preview &&
                !value?.id &&
                !value?.url ? (
                placeholder
              ) : (
                <Image
                  src={
                    uploadedFile
                      ? sdk.storage.utils.getImageUrl(uploadedFile._id, {
                        width: dimensions?.width || 384,
                        height: dimensions?.height || 384,
                      })
                      : selectedFile?.preview ?? (value?.id
                        ? sdk.storage.utils.getImageUrl(value.id, {
                          width: dimensions?.width || 384,
                          height: dimensions?.height || 384,
                        })
                        : value?.url ?? "/img/placeholder.png")
                  }
                  className="block w-auto"
                  alt=""
                  style={{
                    objectFit: "cover",
                  }}
                  priority={false}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}

              {!selectedFile && (
                <span
                  className={clsx(
                    "absolute cursor-pointer rounded-full bg-gray-900/70 p-2 text-white hover:bg-gray-900",
                    "bottom-2 right-2",
                  )}
                >
                  <Icons.Edit className="h-5 w-5" />
                </span>
              )}
            </div>

            {isDragActive && !isDragReject ? (
              <div className="absolute inset-1 rounded-lg bg-blue-300/50"></div>
            ) : null}

            {selectedFile && !isDragActive && (
              <button
                onClick={event => {
                  event.preventDefault();
                  event.stopPropagation();
                  setUploadedFile(null);
                  setSelectedFile(null);
                  setPreview(null);
                  onRemove && onRemove();
                }}
                className={clsx(
                  "absolute cursor-pointer text-red-300 hocus:text-red-500",
                  "right-2 top-2",
                )}
              >
                <Icons.CloseFillCircle className="h-9 w-9" />
              </button>
            )}
            {processing && (
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-5 -translate-y-5 rounded-full bg-black/10 p-0">
                <svg className="h-10 w-10 -rotate-90">
                  <circle
                    className="text-white/50"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="transparent"
                    r="17"
                    cx="20"
                    cy="20"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference -
                      ((progressInfos.percentage || 0) / 100) * circumference
                    }
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="17"
                    cx="20"
                    cy="20"
                  />
                </svg>
                {/* <span className="absolute text-xl text-green-700">{index} {`${progressInfos[index].percentage}%`}</span> */}
              </span>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ImageUploader;

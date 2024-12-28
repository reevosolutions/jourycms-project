import FileUploader, {
  UploadFileDatum,
} from "@/features/storage/form-components/file.uploader.development";
import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import Image from "next/image";
import React, {useState} from "react";

const logger = initLogger(LoggerContext.COMPONENT, "FileCustomField");

type Props<IsMulti extends boolean = false> =
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<
    "file",
    IsMulti
  > & {
    image_ratio: number;
  };

const FileCustomField: React.FC<Props> = <IsMulti extends boolean = false>({
  label,
  required,
  value,
  onChange,
  options: {multiple, accept, ...options},
  default_value,
  image_ratio = 1 / 1,
}: Props<IsMulti>) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [previousValue, setPreviousValue] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <FileUploader<IsMulti>
      accept={accept}
      multiple={multiple}
      value={value as any}
      autoUpload={true}
      canUpload={true}
      onChange={(value: any) => {
        const result = multiple
          ? ((value as UploadFileDatum[]) || [])
              .filter(v => !!v._id)
              .map(v => {
                logger.value("#### File ###", v, v._id);
                return {
                  id: v._id,
                  url: sdk.storage.utils.getFileUrl(v._id || ""),
                };
              })
          : value
            ? {
                id: value._id,
                url: sdk.storage.utils.getFileUrl(value._id),
              }
            : null;
        logger.value("File field changed", {value, result});
        onChange(result as any);
      }}
      containerClassname="w-80 max-w-full aspect-square rounded-lg overflow-hidden"
      placeholder={
        <div className="flex w-full justify-center text-center">
          <Image
            src="/cms/assets/svg/upload-image.svg"
            width={100}
            height={100}
            alt="upload"
          />
        </div>
      }
    />
  );
};

export default FileCustomField;

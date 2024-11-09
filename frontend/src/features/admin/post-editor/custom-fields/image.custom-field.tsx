import ImageUploader from "@/features/storage/form-components/image.uploader";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import Image from "next/image";
import React from "react";

const logger = initLogger(LoggerContext.COMPONENT, "ImageCustomField");

type Props =
  Levelup.CMS.V1.Content.CustomFields.Forms.MetaFieldInputProps<"image"> & {
    image_ratio: number;
  };

const ImageCustomField: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  options,
  default_value,
  image_ratio = 1 / 1,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
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
    <ImageUploader
      value={value}
      onUpload={file => {
        logger.value("File uploaded", file);
        onChange({
          id: file._id,
          url: sdk.storage.utils.getFileUrl(file._id),
        });
      }}
      onRemove={() => {
        logger.value("File removed");
        onChange(null);
      }}
      imageRatio={image_ratio}
      containerClassname="w-80 max-w-full aspect-square rounded-lg overflow-hidden"
      dimensions={{
        width: 400,
        height: 400 * image_ratio,
      }}
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

export default ImageCustomField;

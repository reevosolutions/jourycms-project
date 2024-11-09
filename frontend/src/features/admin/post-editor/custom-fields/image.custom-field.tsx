import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/customized.form';
import { Label } from "@/components/ui/label";
import React, { useState, useCallback, useEffect } from 'react';
import { format } from "date-fns"
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover"
import { LuCalendar } from "react-icons/lu";
import ImageUploader from "@/features/storage/form-components/image.uploader";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useSdk } from "@/hooks/use-sdk";

const logger = initLogger(LoggerContext.COMPONENT, 'ImageCustomField');

type Props = Levelup.CMS.V1.UI.Forms.CustomFields.MetaFieldInputProps<'image'> & {
  image_ratio: number;
};

const ImageCustomField: React.FC<Props> = ({
  label,
  required,
  value,
  onChange,
  options,
  default_value,
  image_ratio = 1/1
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
      onUpload={(file) => {
        logger.value("File uploaded", file);
        onChange({
          id: file._id,
          url: sdk.storage.utils.getFileUrl(file._id),
        })
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
        <div className="flex w-full justify-center text-center ">
          <Image src="/cms/assets/svg/upload-image.svg" width={100} height={100} alt="upload" />
        </div>
      }
    />




  );

};


export default ImageCustomField;




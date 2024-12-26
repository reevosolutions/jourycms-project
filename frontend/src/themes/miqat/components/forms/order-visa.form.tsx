/* eslint-disable react/no-children-prop */

"use client";

import { FormMessage } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "@/features/storage/form-components/file.uploader";
import ImageUploader from "@/features/storage/form-components/image.uploader";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useAppDispatch } from "@/lib/redux/hooks";
import { cn } from "@/lib/utils";
import { useForm, type Validator } from "@tanstack/react-form";
import { yupValidator } from "@tanstack/yup-form-adapter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import * as yup from "yup";

const logger = initLogger(LoggerContext.FORM, "OrderVisaForm");

import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
type FormDataFields = {
  phone: string;
  email: string;
  passport: Levelup.CMS.V1.Utils.Common.FileAttribute;
  photo: Levelup.CMS.V1.Utils.Common.FileAttribute;
  payment_method: "visa" | "mastercard" | "paypal" | "cib" | "baridi" | null;
  description: string;
};
export type LoginFormProps = {};

type Props = {};

const PAYMENT_METHODS: ("visa" | "mastercard" | "paypal" | "cib" | "baridi")[] =
  ["baridi", "cib", "visa", "mastercard", "paypal"];

const OrderVisaForm: React.FC<Props> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [passportFile, setPassportFile] =
    useState<Levelup.CMS.V1.Storage.Entity.UploadedFile | null>(null);
  /* -------------------------------------------------------------------------- */
  /*                                    FORM                                    */
  /* -------------------------------------------------------------------------- */
  const form = useForm<
    Levelup.CMS.V1.Utils.DeepComplete<FormDataFields>,
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      passport: null,
      photo: null,
      phone: "",
      email: "",
      payment_method: null,
      description: "",
    },

    onSubmit: async ({value, formApi}) => {
      const payload: ApiAlias.Create.Request<FormDataFields> = {
        data: {
          form: "order-visa",
          data: {
            ...value,
          },
        },
      };

      try {
        const {data} = await sdk.content.formEntries.create(payload);

        if (data) {
          // router.push(
          //   setPathParams(publicRoutes.homepage._.myAccount.path, { id: data?.user?._id }),
          // );
          logger.success("posted", data);
          toast.success("تم إرسال المعلومات بنجاح");
          // setPassportFile(null);
          // formApi.reset();
        }
      } catch (error: any) {
        toast.error(error.message, {});
      }
    },
    validatorAdapter: yupValidator(),
  });

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="form">
      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">{"الصورة الشمسية"}</Label>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name="photo"
            validators={{
              onChange: yup.object().required("الصورة الشمسية مطلوبة"),
            }}
            children={field => (
              <div>
                <ImageUploader
                  value={field.state.value}
                  onUpload={file => {
                    logger.value("File uploaded", file);
                    field.handleChange({
                      id: file._id,
                      url: sdk.storage.utils.getFileUrl(file._id),
                    });
                  }}
                  onRemove={() => {
                    logger.value("File removed");
                    field.handleChange(null);
                  }}
                  imageRatio={1}
                  containerClassname="w-80 max-w-full aspect-square rounded-lg overflow-hidden"
                  dimensions={{
                    width: 400,
                    height: 400,
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
                {field.state.meta.errors?.[0] && (
                  <FormMessage error={field.state.meta.errors?.[0]} />
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">{"جواز السفر"}</Label>
        <form.Field
          name="passport"
          validators={{
            onChange: yup.object().required("يحب عليك تحميل صورة لجواز السفر"),
          }}
          children={field => (
            <div>
              <FileUploader<false>
                accept={["pdf", "images"]}
                multiple={false}
                autoUpload
                value={passportFile}
                onChange={value => {
                  logger.value("File uploaded", value);
                  if (!value?.dbRecord && !passportFile) return;
                  if (value?.dbRecord?._id === passportFile?._id) return;
                  setPassportFile(value?.dbRecord || null);
                  field.handleChange(
                    value?.dbRecord
                      ? {
                          id: value.dbRecord._id,
                          url: sdk.storage.utils.getFileUrl(value.dbRecord._id),
                        }
                      : null,
                  );
                }}
                containerClassname="w-full max-w-full aspect-square rounded-lg overflow-hidden"
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
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </div>
          )}
        />
      </div>
      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">
          {"البريد الالكتروني"}
        </Label>
        <form.Field
          name="email"
          validators={{
            onChange: yup.string().email("البريد الالكتروني غير صحيح"),
          }}
          children={field => (
            <>
              <Input
                type="email"
                placeholder="البريد الالكتروني"
                className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                value={field.state.value}
                onChange={event => field.handleChange(event.target.value)}
              />
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </>
          )}
        />
      </div>

      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">{"رقم الهاتف"}</Label>
        <form.Field
          name="phone"
          validators={{
            onChange: yup.string().required("رقم الهاتف مطلوب"),
          }}
          children={field => (
            <>
              <Input
                placeholder="رقم الهاتف"
                className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                value={field.state.value}
                onChange={event => field.handleChange(event.target.value)}
              />
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </>
          )}
        />
      </div>
      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">{"الوصف"}</Label>
        <form.Field
          name="description"
          validators={{}}
          children={field => (
            <>
              <Textarea
                rows={6}
                placeholder="الوصف"
                className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                value={field.state.value}
                onChange={event => field.handleChange(event.target.value)}
              />
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </>
          )}
        />
      </div>

      {/* field */}
      <div className="field mb-6">
        <Label className="text-xl text-darkblue-500">{"طريقة الدفع"}</Label>
        <form.Field
          name="payment_method"
          validators={{}}
          children={field => (
            <>
              <div className="mt-2 flex gap-4">
                {PAYMENT_METHODS.map(method => (
                  <button
                    key={method}
                    className={cn(
                      "relative aspect-square w-16 rounded-lg border-2 p-2",
                      field.state.value === method
                        ? "border-beige-200 bg-beige-50/30"
                        : "border-slate-200",
                    )}
                    onClick={() => field.handleChange(method)}
                  >
                    <Image
                      src={`/payment-gateways-logos/${method}.svg`}
                      alt={tLabel(`payment.${method}`)}
                      className="h-full w-full object-contain"
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </div>
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </>
          )}
        />
      </div>

      <div className="flex justify-center py-10">
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="inline-flex gap-4 rounded-xl bg-darkblue-700 px-10 py-2 pb-3 pt-4 text-xl font-bold text-white transition-all disabled:opacity-50 hocus:bg-darkblue-900"
              type="submit"
              disabled={!canSubmit || isSubmitting}
              onClick={form.handleSubmit}
            >
              {isSubmitting && <LuLoader2 className="animate-spin" />}
              {isSubmitting ? "جار الارسال" : "أرسل"}
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default OrderVisaForm;

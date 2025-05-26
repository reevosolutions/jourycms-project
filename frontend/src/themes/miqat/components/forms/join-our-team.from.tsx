/* eslint-disable react/no-children-prop */

"use client";
import Image from "next/image";
import React, {useState} from "react";
import {authenticate} from "@features/auth/redux/slice";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import initLogger, {LoggerContext} from "@/lib/logging";
import Link from "next/link";
import * as yup from "yup";
import {useSdk} from "@/hooks/use-sdk";
import {publicRoutes} from "@/config";
import {FormMessage} from "@/components/ui/customized.form";
import {cn} from "@/lib/utils";
import {useForm, type Validator} from "@tanstack/react-form";

import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import {setPathParams} from "@/lib/routes";
import {toast} from "sonner";
import {yupValidator} from "@tanstack/yup-form-adapter";
import useCMSContent from "@/hooks/use-cms-content";
import {Loader2} from "lucide-react";
import {useAppDispatch} from "@/lib/redux/hooks";
import {Textarea} from "@/components/ui/textarea";
import {LuLoader2} from "react-icons/lu";

const logger = initLogger(LoggerContext.FORM, "JoinOurTeamForm");

const FORM_KEY = "join-our-team";


import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
import FileUploader from "@/features/storage/form-components/file.uploader.legacy";
type FormDataFields = {
  first_name: string;
  family_name: string;
  phone: string;
  email: string;
  certificate: Levelup.CMS.V1.Utils.Common.FileAttribute;
};

export type LoginFormProps = {};

type Props = {};

const JoinOurTeamForm: React.FC<Props> = ({}) => {
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
  const [certificateFile, setCertificateFile] =
    useState<Levelup.CMS.V1.Storage.Entity.UploadedFile | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                    FORM                                    */
  /* -------------------------------------------------------------------------- */
  const form = useForm<
    Levelup.CMS.V1.Utils.DeepComplete<FormDataFields>,
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      first_name: "",
      family_name: "",
      phone: "",
      email: "",
      certificate: null,
    },

    onSubmit: async ({value, formApi}) => {
      const payload: ApiAlias.Create.Request<FormDataFields> = {
        data: {
          form: FORM_KEY,
          data: {
            ...value,
          },
        },
      };

      try {
        const {data} = await sdk.content.formEntries.create(payload);

        if (data) {
          logger.success("posted", data);
          toast.success("تم إرسال المعلومات بنجاح");
          formApi.reset();
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
        <Label className="text-xl text-darkblue-500">{"الاسم واللقب"}</Label>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form.Field
            name="first_name"
            validators={{
              onChange: yup.string().required("الاسم مطلوب"),
            }}
            children={field => (
              <div>
                <Input
                  type="text"
                  placeholder="الاسم"
                  className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                  value={field.state.value}
                  onChange={event => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <FormMessage error={field.state.meta.errors?.[0]} />
                )}
              </div>
            )}
          />
          <form.Field
            name="family_name"
            validators={{
              onChange: yup.string().required("اللقب مطلوب"),
            }}
            children={field => (
              <div>
                <Input
                  type="text"
                  placeholder="اللقب"
                  className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                  value={field.state.value}
                  onChange={event => field.handleChange(event.target.value)}
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
        <Label className="text-xl text-darkblue-500">
          {"البريد الالكتروني"}
        </Label>
        <form.Field
          name="email"
          validators={{
            onChange: yup
              .string()
              .email("البريد الالكتروني غير صحيح")
              .required("البريد الالكتروني مطلوب"),
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
        <Label className="text-xl text-darkblue-500">{"شهادة الكفاءة"}</Label>
        <form.Field
          name="certificate"
          validators={{
            onChange: yup.object().required("يحب عليك تحميل شهادة الكفاءة"),
          }}
          children={field => (
            <div>
              <FileUploader<false>
                accept={["pdf", "images"]}
                multiple={false}
                autoUpload
                value={certificateFile}
                onChange={value => {
                  logger.value("File uploaded", value);
                  if (!value?.dbRecord && !certificateFile) return;
                  if (value?.dbRecord?._id === certificateFile?._id) return;
                  setCertificateFile(value?.dbRecord || null);
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

export default JoinOurTeamForm;

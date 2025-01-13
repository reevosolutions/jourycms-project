/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable react/no-children-prop */
"use client";

import {toast} from "sonner";

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import initLogger, {LoggerContext} from "@/lib/logging";
import {cn} from "@/lib/utils";
import {useForm, type Validator} from "@tanstack/react-form";
import {yupValidator} from "@tanstack/yup-form-adapter";
import {useMemo, useState} from "react";
import * as yup from "yup";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {FormMessage} from "@/components/ui/customized.form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import {publicRoutes} from "@/config";
import useCMSContent from "@/hooks/use-cms-content";
import {useSdk} from "@/hooks/use-sdk";
import {setPathParams} from "@/lib/routes";
import {checkSimilarity} from "@/lib/utilities/strings";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";
import {LuCheck, LuChevronsUpDown} from "react-icons/lu";
import {Loader2} from "lucide-react";
import {faker} from "@faker-js/faker";

const logger = initLogger(LoggerContext.FORM, "RegisterForm");

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth.Signup;

export type RegisterFormProps = {};

const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {getWebsiteConfigValue, getArticleTypeBySlug} = useCMSContent();
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const states:
    | {
        code: string;
        name: string;
      }[]
    | undefined = useMemo(
    () => getWebsiteConfigValue("states", []),
    [getWebsiteConfigValue],
  );
  const cities:
    | {
        state_code: string;
        code: string;
        name: string;
      }[]
    | undefined = useMemo(
    () => getWebsiteConfigValue("cities", []),
    [getWebsiteConfigValue],
  );
  const [wilayaOpen, setWilayaOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                    FORRM                                   */
  /* -------------------------------------------------------------------------- */
  const form = useForm<
    Levelup.CMS.V1.Utils.DeepComplete<ApiAlias.Request["data"]> & {
      confirm_password: string;
    },
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      account_type: "agency",
      first_name: "",
      family_name: "",
      sex: "male",
      phones: [],
      website: "",
      address: {
        country_code: "dz",
        country_name: "algeria",
        state_code: "",
        state_name: "",
        city_code: "",
        city_name: "",
        street_address: "",
      },
      email: "", //faker.internet.email(),
      password: "",
      confirm_password: "",
    },

    onSubmit: async ({value}) => {
      const payload: ApiAlias.Request = {
        data: {
          ...value,
        },
      };

      try {
        const {data} = await sdk.auth.auth.register(payload);

        if (data?.user?._id) {
          router.push(
            setPathParams(publicRoutes.homepage._.myAccount.path, {
              id: data?.user?._id,
            }),
          );
        }
      } catch (error: any) {
        toast.error(error.message, {});
      }
    },
    validatorAdapter: yupValidator(),
  });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="">
      <div className="max-w-full px-4 py-6">
        
        {/* field */}
        <form.Field
          name="account_type"
          validators={{
            onChange: yup.string().required("نوع الحساب مطلوب"),
          }}
          children={field => (
            <div className="field mb-6">
              <Label className="text-xl text-darkblue-500">
                {"نوع الحساب"}
              </Label>
              <div className="mt-3 grid min-w-80 grid-cols-1 gap-2 sm:gap-8">
                <button
                  className={cn(
                    "flex h-40 flex-col items-center justify-center rounded-4xl border-2 bg-slate-100 p-4 transition-all",
                    field.state.value === "agency"
                      ? "border-orange-600 text-orange-600"
                      : "border-slate-100 text-darkblue-500",
                  )}
                  onClick={() => field.handleChange("agency")}
                  aria-label="agency"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 44.86 44.86"
                  >
                    <path
                      fill="currentColor"
                      d="M19.02 20.96c.26-.4.1-1.67.1-1.67C9.66 16.03 2.6 11.96 3 10.3c.2-.82.47-1.18.66-1.24.42-.14 1.37.36 2.54 1.13l1.95-2.28c-.92-.57-3.19-2.43-5.42-1.7C1.84 6.5.64 7.32.1 9.6c-1.28 5.32 11.41 10.12 18.22 12.48l.71-1.12z"
                    />
                    <path
                      fill="currentColor"
                      d="M41.11 10.65A20.4 20.4 0 0 0 24.43 2h-.12a20.4 20.4 0 0 0-17.23 9.68c.43.27.9.55 1.45.85.18-.3.37-.59.57-.88 1.27.85 2.74 1.6 4.37 2.2-.1.33-.16.67-.24 1l1.55.66c.09-.38.16-.76.26-1.12 2.58.8 5.48 1.27 8.55 1.34v2.13l.1.07.15.87.23 1.35 1.2.3v-4.72c.6-.01 1.18-.06 1.76-.1l.44-1.24.16-.48c-.77.07-1.56.13-2.36.14V3.75c3.4.52 6.34 4.05 8 9.1-.8.23-1.66.42-2.53.6.57.28 1.14.73 1.54 1.35.49-.12.98-.24 1.46-.38.62 2.38.99 5.03 1 7.84h-2.6l-.08.5 2.5 1.03c.77.32 1.35.8 1.74 1.4.03-.42.07-.83.08-1.26h4.03c-.07.52-.14 1.05-.23 1.55.25-.13.48-.39.6-.87.06-.26.06-.48.05-.68h2.3a18.62 18.62 0 0 1-3.37 9.28 21.28 21.28 0 0 0-4.45-2.24c.1-.33.17-.68.25-1.02a3.1 3.1 0 0 1-1.96.65c-.33 0-.6-.04-.8-.07h-.05c-.2-.02-.48-.04-2.18-.63.2-.27.44-.62.7-1.03v-.84c.79.27 1.46.5 1.62.5.44.03 1.56.42 1.88-.92.33-1.33-.51-1.78-.98-1.97l-2.52-1.03v-1.7l-.58 1.46-.88-.36s1.27-6.99.92-7.87-1.38-1.08-1.38-1.08l-2.76 7.8-3-.77-1.28-.33-.44-2.62-1.4-.9s.09 2.16-.12 3.33c-.04.22-.09.4-.15.53l-.1.16a6.5 6.5 0 0 1-.63.83 14.43 14.43 0 0 1-.76.82c-.39.39-.7.67-.7.67l1.23.9 2.04-1.54.46-.36.73.36 1.85.89.95.45.2.1-3.07 7.67s1.01.9 1.77.32c.76-.59 4-6.45 4-6.45l1.3.48-.17.43.3-.02v1.76l-.23-.08-.33-.04-.9 1.57c1.81.2 3.55.53 5.13 1-1.66 5.05-4.6 8.57-8 9.1v-6.09a2.9 2.9 0 0 1-1.68.54v5.56c-3.44-.47-6.4-4-8.1-9.08 1.72-.52 3.6-.88 5.6-1.08l.69-1.73c-2.4.18-4.68.6-6.75 1.23a31.29 31.29 0 0 1-.97-6.53h1.73l.44-.42a98.17 98.17 0 0 1-3.88-1.41v.15H5.67c.01-1.04.11-2.06.29-3.05a42.4 42.4 0 0 1-1.54-.87 20.31 20.31 0 0 0 4.3 17.16 20.4 20.4 0 0 0 15.59 7.36h.12a20.4 20.4 0 0 0 16.68-8.64 20.32 20.32 0 0 0 0-23.57zm-27.17 1.64a19.45 19.45 0 0 1-3.85-1.92c2.19-2.6 5.07-4.6 8.37-5.72-1.88 1.81-3.44 4.46-4.52 7.64zm9.65 1.77a30.93 30.93 0 0 1-8.09-1.24c1.69-5.08 4.65-8.62 8.1-9.09v10.33zM5.74 23.94h6.64c.1 2.5.49 4.89 1.09 7.07-1.63.6-3.1 1.35-4.37 2.2a18.63 18.63 0 0 1-3.36-9.27zm4.35 10.55a19.56 19.56 0 0 1 3.85-1.92c1.08 3.18 2.64 5.83 4.52 7.64a18.81 18.81 0 0 1-8.37-5.72zm20.16 5.77c1.91-1.82 3.5-4.5 4.58-7.72 1.48.54 2.8 1.2 3.94 1.95a18.81 18.81 0 0 1-8.52 5.77zm0-35.66a18.8 18.8 0 0 1 8.52 5.77c-.98.65-2.1 1.22-3.33 1.71l-.1-.02-.02.07-.49.2c-1.08-3.23-2.67-5.9-4.58-7.73zm6.17 17.66a32.56 32.56 0 0 0-1.11-8.37 21.58 21.58 0 0 0 4.45-2.23c2.12 3 3.39 6.65 3.43 10.6h-6.77z"
                    />
                  </svg>
                  <span>{"وكالة أسفار"}</span>
                </button>
              </div>
              <div className="mt-3 grid min-w-80 grid-cols-4 gap-2 sm:gap-8">
                <button
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-4xl border-2 bg-slate-100 p-4 opacity-70 transition-all",
                    field.state.value === "escort"
                      ? "border-orange-600 text-orange-600"
                      : "border-slate-100 text-darkblue-500",
                  )}
                  onClick={() => field.handleChange("escort")}
                  aria-label="escort"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 200.7 200.7"
                  >
                    <path
                      fill="currentColor"
                      d="m191 111.6-.3-.3a22 22 0 0 0-9-5.9l-.6-.2a100.6 100.6 0 0 0-12.5-5c-5.2-2.5-5.7-4-5.8-4.2l-.3-.5.2-.5a36.8 36.8 0 0 0 7.5-15.5l.2-.3c1-1.4 1.7-3 2-4.7 1.2-4.4 1.2-7.6.2-9.8l-.1-.2v-.3c1.4-5.6 2.7-16.2-3.8-23.7-1-1.3-5-5.7-12.8-8l-3.8-1.2a52 52 0 0 0-10.7-2.4c-.4 0-.8 0-1.3.2h-1.4c-2 0-4.3 1-4.3 1-2.1.8-13.2 6-16.7 16.8-.6 1.5-1.8 6.2-.3 16.5v.4c-1.7 2.2-1.8 5.6-.5 10.2.4 2.1 1 3.7 2 5l.2.3a36 36 0 0 0 6.9 15.3l.3.4-.3.4a2 2 0 0 0-.3.6c-.5 1.6-4.7 4-11.2 6.6l-2.8-1-3.2-1.2c-6.9-3.4-7.8-5.4-7.9-5.8l-.4-.8.4-.8a49.6 49.6 0 0 0 10-20.8l.3-.5a13 13 0 0 0 2.6-6.2c1.7-5.9 1.7-10.2.3-13.2l-.2-.3.1-.3c1.8-7.7 3.6-21.9-5.2-31.8a34.2 34.2 0 0 0-17-10.7l-5.1-1.7a70.4 70.4 0 0 0-14.5-3.2c-.5 0-1 0-1.7.2l-.7.1a15 15 0 0 0-6.9 1.2C59.7 7 45 13.8 40.1 28.4c-.7 2-2.3 8.3-.3 22.1l.1.4-.3.4c-2 2.8-2.2 7.4-.5 13.6a14 14 0 0 0 2.7 6.6l.2.5a48.3 48.3 0 0 0 9.3 20.6l.5.5-.5.7-.3.8c-1.2 3.3-14.4 9.2-26 12.8-8.3 3.1-12 8.3-12 8.3-11.5 17-13 53.6-13 55.2.2 9.5 4.5 11.4 5.3 11.7l.8.3c25.3 11 62.4 13.2 66.6 13.5H74l3.6-.1h.5l.8.1h.2c1.7 0 41.5-2.4 66.3-13.5 1.4-.4 5.8-2.2 6.2-11.5 8.8-.8 30-3.2 44.4-9.7 1-.2 4.6-1.7 4.7-9.2-.2-3-1.6-28.7-9.7-40.9zM55 98.4l.7-.7.7.7c6 5.7 12.8 8.8 19 8.8 6.4 0 13-2.7 19.1-8l.6-.5 1.3.7a30 30 0 0 0 4.1 3l1.3.6-.2.1.5.3a60 60 0 0 0 7.8 3.6c.2.1 6.3 2 13.2 5.3l1.3.3c6.5 2.5 9.3 6 9.4 6.2 10.2 15.1 11.9 48.1 12 51.8 0 5.2-1.5 6.5-1.9 6.8-22.8 10.2-57.3 12.9-64 13.3h-.4l-.7-.1h-.3l-4.7.2h-1.1c-4.2-.3-41.4-2.7-65.2-13.3-.5-.2-1.9-1.9-2-6.6 0-.4 1.2-36 12-51.9.5-.7 3.4-4 9.2-6.3A99.3 99.3 0 0 0 51.4 102l1-.8c.4-.6 1.5-1.7 2.7-2.8zm71.2 8.9-1-.3-4.8-2a35.6 35.6 0 0 0 6.4-4l2-2 .5-.4.4.4a22 22 0 0 0 14.2 6.6c4.8 0 9.8-2.1 14.3-6l.4-.3.9.4c.8.8 2.3 2 3 2.3l.8.3v.1l.4.3a40.8 40.8 0 0 0 5.8 2.7c.2 0 4.7 1.5 9.8 3.9l1 .3c4.7 1.8 6.7 4.2 6.9 4.5 7.6 11.3 8.8 35.7 9 38.4-.1 3.8-1.2 4.8-1.4 5a152.7 152.7 0 0 1-43.5 9.5c-.8-11.2-3.6-37.6-12.8-51.4l-.4-.4a30 30 0 0 0-12-7.9zm-5.4-40.8.2-.2c.7-.5 1-1.4 1-2.2-1.8-10.3-.7-14.7-.3-15.7 3-9.2 12.4-13.5 14.3-14.3l1.8-.5h.3l1.4-.1v.1h.4l.9-.2h.4c.3 0 4 .4 9.5 2l3.8 1.4a21 21 0 0 1 10.7 6.6c5.5 6.3 4 15.8 2.6 20.9-.1.6 0 1.2.3 1.8l.3.4c.4.5.8 2.6-.4 7a5.8 5.8 0 0 1-1.5 3.2c-.3.3-.5.7-.5 1.2-1.9 11-11.7 23.3-22.1 23.3-8.8 0-18.9-11.3-20.7-23.3 0-.5-.3-.9-.6-1.2a6.5 6.5 0 0 1-1.5-3.6c-.9-3-1-5.6-.3-6.6zM44.2 54.6l.3-.3c1-.6 1.4-1.7 1.2-2.8-2.3-14-.8-19.8-.3-21.2C49.4 17.9 62.2 12 64.7 11a14 14 0 0 1 2.5-.6l.3-.1 2.1-.1v.1h.5l1.3-.2.5-.1c.4 0 5.3.6 12.7 2.8l5.1 1.8c9.4 2.8 13.7 8 14.5 9 7.5 8.5 5.5 21.3 3.6 28.2-.2.8 0 1.6.4 2.3l.4.5c.7 1 1 4-.6 9.7-.3 1.8-1 3.3-2 4.3-.3.4-.6 1-.7 1.5-2.5 15-15.8 31.5-29.9 31.5-12 0-25.5-15.3-28-31.5 0-.5-.3-1-.7-1.5-1-1-1.7-2.6-2-4.9-1.3-4.2-1.4-7.6-.5-9z"
                    />
                  </svg>
                  <span>{"مرشد"}</span>
                </button>
                <button
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-4xl border-2 bg-slate-100 p-4 opacity-70 transition-all",
                    field.state.value === "escort"
                      ? "border-orange-600 text-orange-600"
                      : "border-slate-100 text-darkblue-500",
                  )}
                  onClick={() => field.handleChange("escort")}
                  aria-label="escort"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 200.7 200.7"
                  >
                    <path
                      fill="currentColor"
                      d="m191 111.6-.3-.3a22 22 0 0 0-9-5.9l-.6-.2a100.6 100.6 0 0 0-12.5-5c-5.2-2.5-5.7-4-5.8-4.2l-.3-.5.2-.5a36.8 36.8 0 0 0 7.5-15.5l.2-.3c1-1.4 1.7-3 2-4.7 1.2-4.4 1.2-7.6.2-9.8l-.1-.2v-.3c1.4-5.6 2.7-16.2-3.8-23.7-1-1.3-5-5.7-12.8-8l-3.8-1.2a52 52 0 0 0-10.7-2.4c-.4 0-.8 0-1.3.2h-1.4c-2 0-4.3 1-4.3 1-2.1.8-13.2 6-16.7 16.8-.6 1.5-1.8 6.2-.3 16.5v.4c-1.7 2.2-1.8 5.6-.5 10.2.4 2.1 1 3.7 2 5l.2.3a36 36 0 0 0 6.9 15.3l.3.4-.3.4a2 2 0 0 0-.3.6c-.5 1.6-4.7 4-11.2 6.6l-2.8-1-3.2-1.2c-6.9-3.4-7.8-5.4-7.9-5.8l-.4-.8.4-.8a49.6 49.6 0 0 0 10-20.8l.3-.5a13 13 0 0 0 2.6-6.2c1.7-5.9 1.7-10.2.3-13.2l-.2-.3.1-.3c1.8-7.7 3.6-21.9-5.2-31.8a34.2 34.2 0 0 0-17-10.7l-5.1-1.7a70.4 70.4 0 0 0-14.5-3.2c-.5 0-1 0-1.7.2l-.7.1a15 15 0 0 0-6.9 1.2C59.7 7 45 13.8 40.1 28.4c-.7 2-2.3 8.3-.3 22.1l.1.4-.3.4c-2 2.8-2.2 7.4-.5 13.6a14 14 0 0 0 2.7 6.6l.2.5a48.3 48.3 0 0 0 9.3 20.6l.5.5-.5.7-.3.8c-1.2 3.3-14.4 9.2-26 12.8-8.3 3.1-12 8.3-12 8.3-11.5 17-13 53.6-13 55.2.2 9.5 4.5 11.4 5.3 11.7l.8.3c25.3 11 62.4 13.2 66.6 13.5H74l3.6-.1h.5l.8.1h.2c1.7 0 41.5-2.4 66.3-13.5 1.4-.4 5.8-2.2 6.2-11.5 8.8-.8 30-3.2 44.4-9.7 1-.2 4.6-1.7 4.7-9.2-.2-3-1.6-28.7-9.7-40.9zM55 98.4l.7-.7.7.7c6 5.7 12.8 8.8 19 8.8 6.4 0 13-2.7 19.1-8l.6-.5 1.3.7a30 30 0 0 0 4.1 3l1.3.6-.2.1.5.3a60 60 0 0 0 7.8 3.6c.2.1 6.3 2 13.2 5.3l1.3.3c6.5 2.5 9.3 6 9.4 6.2 10.2 15.1 11.9 48.1 12 51.8 0 5.2-1.5 6.5-1.9 6.8-22.8 10.2-57.3 12.9-64 13.3h-.4l-.7-.1h-.3l-4.7.2h-1.1c-4.2-.3-41.4-2.7-65.2-13.3-.5-.2-1.9-1.9-2-6.6 0-.4 1.2-36 12-51.9.5-.7 3.4-4 9.2-6.3A99.3 99.3 0 0 0 51.4 102l1-.8c.4-.6 1.5-1.7 2.7-2.8zm71.2 8.9-1-.3-4.8-2a35.6 35.6 0 0 0 6.4-4l2-2 .5-.4.4.4a22 22 0 0 0 14.2 6.6c4.8 0 9.8-2.1 14.3-6l.4-.3.9.4c.8.8 2.3 2 3 2.3l.8.3v.1l.4.3a40.8 40.8 0 0 0 5.8 2.7c.2 0 4.7 1.5 9.8 3.9l1 .3c4.7 1.8 6.7 4.2 6.9 4.5 7.6 11.3 8.8 35.7 9 38.4-.1 3.8-1.2 4.8-1.4 5a152.7 152.7 0 0 1-43.5 9.5c-.8-11.2-3.6-37.6-12.8-51.4l-.4-.4a30 30 0 0 0-12-7.9zm-5.4-40.8.2-.2c.7-.5 1-1.4 1-2.2-1.8-10.3-.7-14.7-.3-15.7 3-9.2 12.4-13.5 14.3-14.3l1.8-.5h.3l1.4-.1v.1h.4l.9-.2h.4c.3 0 4 .4 9.5 2l3.8 1.4a21 21 0 0 1 10.7 6.6c5.5 6.3 4 15.8 2.6 20.9-.1.6 0 1.2.3 1.8l.3.4c.4.5.8 2.6-.4 7a5.8 5.8 0 0 1-1.5 3.2c-.3.3-.5.7-.5 1.2-1.9 11-11.7 23.3-22.1 23.3-8.8 0-18.9-11.3-20.7-23.3 0-.5-.3-.9-.6-1.2a6.5 6.5 0 0 1-1.5-3.6c-.9-3-1-5.6-.3-6.6zM44.2 54.6l.3-.3c1-.6 1.4-1.7 1.2-2.8-2.3-14-.8-19.8-.3-21.2C49.4 17.9 62.2 12 64.7 11a14 14 0 0 1 2.5-.6l.3-.1 2.1-.1v.1h.5l1.3-.2.5-.1c.4 0 5.3.6 12.7 2.8l5.1 1.8c9.4 2.8 13.7 8 14.5 9 7.5 8.5 5.5 21.3 3.6 28.2-.2.8 0 1.6.4 2.3l.4.5c.7 1 1 4-.6 9.7-.3 1.8-1 3.3-2 4.3-.3.4-.6 1-.7 1.5-2.5 15-15.8 31.5-29.9 31.5-12 0-25.5-15.3-28-31.5 0-.5-.3-1-.7-1.5-1-1-1.7-2.6-2-4.9-1.3-4.2-1.4-7.6-.5-9z"
                    />
                  </svg>
                  <span>{"إمام"}</span>
                </button>
                <button
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-4xl border-2 bg-slate-100 p-4 opacity-70 transition-all",
                    field.state.value === "doctor"
                      ? "border-orange-600 text-orange-600"
                      : "border-slate-100 text-darkblue-500",
                  )}
                  onClick={() => field.handleChange("doctor")}
                  aria-label="doctor"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M111 412a46 46 0 0 0-14 33l1 8a24 24 0 0 0 4 8l4 4 7 1v-9a4 4 0 0 1-3-1l-1-2-2-4v-5a37 37 0 0 1 7-22 46 46 0 0 1 23-17 34 34 0 0 1 22 1c6 3 12 7 16 11 5 5 8 11 9 16 2 4 2 8 2 11v5l-1 3-1 2-2 1-2 1v9a14 14 0 0 0 10-3l3-4 2-6 1-8-2-14-7-13c-4-6-10-12-17-16a48 48 0 0 0-24-7 45 45 0 0 0-35 17z"
                    />
                    <path
                      fill="currentColor"
                      d="M166 452c-2 1-3 3-3 5v8c0 2 1 4 3 5 1 2 3 2 5 2l6-2v-18l-6-1c-2-1-4 0-5 1zm-44-1-6 1v18l6 2a7 7 0 0 0 8-7v-8a7 7 0 0 0-8-6z"
                    />
                    <path
                      fill="currentColor"
                      d="M453 430a82 82 0 0 0-31-46l-21-12-33-13a174 174 0 0 1-34-17l-8-8c-2-3-3-7-3-11a85 85 0 0 1 2-32c5-5 9-12 13-19l12-27a49 49 0 0 0 22-19 82 82 0 0 0 11-35c0-6-1-11-4-16-1-4-3-7-6-10a233 233 0 0 0 8-52 127 127 0 0 0-8-44 68 68 0 0 0-45-38 95 95 0 0 0-22-20c-5-3-11-5-17-6l-17-2a281 281 0 0 0-37 4l-9 2a46 46 0 0 1-6 0h-6a126 126 0 0 1-27-7l-2-1-2-1h-1a9 9 0 0 0-4 1l-3 1-3 2-7 6a109 109 0 0 0-15 19l-4 8a202 202 0 0 0-13 66 204 204 0 0 0 4 40l1 3v8l2 9-7 11a39 39 0 0 0-3 26c1 7 3 13 6 18 4 8 8 15 14 19 4 4 8 6 12 8l12 27c4 7 8 14 13 19a107 107 0 0 1 2 32l-2 7c-1 4-3 7-6 10l-11 8-15 7-31 11-25 12-17 13c-8 7-15 16-20 27-4 12-7 25-7 41l1 6 3 5c2 3 5 6 9 8 6 5 14 9 24 13 16 6 37 11 64 15a719 719 0 0 0 264-15 130 130 0 0 0 24-12l9-9 3-5 1-6c0-11-1-21-4-29zm-126-72-50 78-5-38 14-15-9-15 38-21a49 49 0 0 0 12 11zM183 87c45 10 134-9 134-9s1 22 16 42c6 8 11 20 14 32-1-2-3-2-6-3-8-1-20-2-33-1-38 2-35 5-51 5s-12-3-50-5c-13-1-25 0-33 1-4 1-6 1-7 4 0 1 0 2-2 3 5-16 17-36 18-69zm157 89c0 1 0 23-15 30a41 41 0 0 1-36 0c-6-3-10-8-12-14l-1-5c-1-4-4-16 3-21 4-4 18-6 31-6 11 0 23 2 27 5 2 3 3 7 3 11zm-101 11-1 5c-2 6-6 11-12 14-5 3-11 4-18 4-6 0-13-1-18-4-15-7-15-29-15-30 0-4 1-8 3-11 3-3 16-5 27-5 13 0 27 2 31 6 7 5 4 17 3 21zm-50 77c-4-7-8-16-12-28l-2-3-3-2a34 34 0 0 1-18-14 65 65 0 0 1-8-26c0-3 0-7 2-10 1-3 3-5 6-7l8 11c2 2 3 0 3-4 2 9 6 24 20 32 20 11 51 7 61-17 4-11 4-22 11-22s8 11 12 22c10 24 41 28 61 17s20-38 20-39 1-2 3-2l2 12 5-9 4 7a23 23 0 0 1 2 14l-5 15c-3 6-6 11-10 14-3 3-7 5-11 6l-3 2-2 3a155 155 0 0 1-23 45l-2 2-1 2a130 130 0 0 0-3 39l3 12 1 1-51 27-57-26 4-14v-10c0-11-2-21-3-29l-1-2-2-2c-4-4-8-10-11-17zm-1 92 8-8 43 20-9 15 14 15-5 36-55-75 4-3zm252 103-4 5-8 5-23 9c-15 5-35 9-59 12a732 732 0 0 1-248-15 109 109 0 0 1-20-10l-5-5a5 5 0 0 1-1-1c0-10 1-18 3-25a65 65 0 0 1 24-36l19-11 23-9v17h11v-21l22-9 87 119 75-118 1 1 7 17 2 21v44h-27v12h67v-12h-27v-44a96 96 0 0 0-6-34l28 11 23 10 14 11c7 6 12 13 16 22s6 20 6 34z"
                    />
                  </svg>
                  <span>{"طبيب"}</span>
                </button>
                <button
                  className={cn(
                    "flex aspect-square flex-col items-center justify-center rounded-4xl border-2 bg-slate-100 p-4 opacity-70 transition-all",
                    field.state.value === "doctor"
                      ? "border-orange-600 text-orange-600"
                      : "border-slate-100 text-darkblue-500",
                  )}
                  onClick={() => field.handleChange("doctor")}
                  aria-label="doctor"
                  disabled
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M111 412a46 46 0 0 0-14 33l1 8a24 24 0 0 0 4 8l4 4 7 1v-9a4 4 0 0 1-3-1l-1-2-2-4v-5a37 37 0 0 1 7-22 46 46 0 0 1 23-17 34 34 0 0 1 22 1c6 3 12 7 16 11 5 5 8 11 9 16 2 4 2 8 2 11v5l-1 3-1 2-2 1-2 1v9a14 14 0 0 0 10-3l3-4 2-6 1-8-2-14-7-13c-4-6-10-12-17-16a48 48 0 0 0-24-7 45 45 0 0 0-35 17z"
                    />
                    <path
                      fill="currentColor"
                      d="M166 452c-2 1-3 3-3 5v8c0 2 1 4 3 5 1 2 3 2 5 2l6-2v-18l-6-1c-2-1-4 0-5 1zm-44-1-6 1v18l6 2a7 7 0 0 0 8-7v-8a7 7 0 0 0-8-6z"
                    />
                    <path
                      fill="currentColor"
                      d="M453 430a82 82 0 0 0-31-46l-21-12-33-13a174 174 0 0 1-34-17l-8-8c-2-3-3-7-3-11a85 85 0 0 1 2-32c5-5 9-12 13-19l12-27a49 49 0 0 0 22-19 82 82 0 0 0 11-35c0-6-1-11-4-16-1-4-3-7-6-10a233 233 0 0 0 8-52 127 127 0 0 0-8-44 68 68 0 0 0-45-38 95 95 0 0 0-22-20c-5-3-11-5-17-6l-17-2a281 281 0 0 0-37 4l-9 2a46 46 0 0 1-6 0h-6a126 126 0 0 1-27-7l-2-1-2-1h-1a9 9 0 0 0-4 1l-3 1-3 2-7 6a109 109 0 0 0-15 19l-4 8a202 202 0 0 0-13 66 204 204 0 0 0 4 40l1 3v8l2 9-7 11a39 39 0 0 0-3 26c1 7 3 13 6 18 4 8 8 15 14 19 4 4 8 6 12 8l12 27c4 7 8 14 13 19a107 107 0 0 1 2 32l-2 7c-1 4-3 7-6 10l-11 8-15 7-31 11-25 12-17 13c-8 7-15 16-20 27-4 12-7 25-7 41l1 6 3 5c2 3 5 6 9 8 6 5 14 9 24 13 16 6 37 11 64 15a719 719 0 0 0 264-15 130 130 0 0 0 24-12l9-9 3-5 1-6c0-11-1-21-4-29zm-126-72-50 78-5-38 14-15-9-15 38-21a49 49 0 0 0 12 11zM183 87c45 10 134-9 134-9s1 22 16 42c6 8 11 20 14 32-1-2-3-2-6-3-8-1-20-2-33-1-38 2-35 5-51 5s-12-3-50-5c-13-1-25 0-33 1-4 1-6 1-7 4 0 1 0 2-2 3 5-16 17-36 18-69zm157 89c0 1 0 23-15 30a41 41 0 0 1-36 0c-6-3-10-8-12-14l-1-5c-1-4-4-16 3-21 4-4 18-6 31-6 11 0 23 2 27 5 2 3 3 7 3 11zm-101 11-1 5c-2 6-6 11-12 14-5 3-11 4-18 4-6 0-13-1-18-4-15-7-15-29-15-30 0-4 1-8 3-11 3-3 16-5 27-5 13 0 27 2 31 6 7 5 4 17 3 21zm-50 77c-4-7-8-16-12-28l-2-3-3-2a34 34 0 0 1-18-14 65 65 0 0 1-8-26c0-3 0-7 2-10 1-3 3-5 6-7l8 11c2 2 3 0 3-4 2 9 6 24 20 32 20 11 51 7 61-17 4-11 4-22 11-22s8 11 12 22c10 24 41 28 61 17s20-38 20-39 1-2 3-2l2 12 5-9 4 7a23 23 0 0 1 2 14l-5 15c-3 6-6 11-10 14-3 3-7 5-11 6l-3 2-2 3a155 155 0 0 1-23 45l-2 2-1 2a130 130 0 0 0-3 39l3 12 1 1-51 27-57-26 4-14v-10c0-11-2-21-3-29l-1-2-2-2c-4-4-8-10-11-17zm-1 92 8-8 43 20-9 15 14 15-5 36-55-75 4-3zm252 103-4 5-8 5-23 9c-15 5-35 9-59 12a732 732 0 0 1-248-15 109 109 0 0 1-20-10l-5-5a5 5 0 0 1-1-1c0-10 1-18 3-25a65 65 0 0 1 24-36l19-11 23-9v17h11v-21l22-9 87 119 75-118 1 1 7 17 2 21v44h-27v12h67v-12h-27v-44a96 96 0 0 0-6-34l28 11 23 10 14 11c7 6 12 13 16 22s6 20 6 34z"
                    />
                  </svg>
                  <span>{"ممرض"}</span>
                </button>
              </div>
            </div>
          )}
        />

        <div className="rounded-xl border bg-slate-50 border-slate-200 px-4 py-3 mb-6">
          <h3 className=" text-xl mb-0 font-medium ">ملاحظة:</h3>
          <p className=" text-gray-500">ستتمكن من إدخال معلومات الحساب بعد إكمال التسجيل في الصفحة المخصصة</p>
        </div>

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
        <form.Field
          name="address"
          validators={{
            onChange: yup.object().shape({
              state_code: yup.string().required("الولاية مطلوبة"),
              city_code: yup.string().required("البلدية مطلوبة"),
            }),
          }}
          children={field => (
            <>
              <div className="field mb-4">
                <Label className="text-xl text-darkblue-500">{"الولاية"}</Label>
                <Popover open={wilayaOpen} onOpenChange={setWilayaOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={wilayaOpen}
                      className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
                      aria-label="state"
                    >
                      <div className="value text-xl">
                        {!field.state.value?.state_code ? (
                          <span className="text-darkblue-500">
                            {"اختر ولاية..."}
                          </span>
                        ) : (
                          <span>
                            {states?.find(
                              (state: {code: string; name: string}) =>
                                state.code === field.state.value?.state_code,
                            )?.name || ""}
                          </span>
                        )}
                      </div>
                      <LuChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
                    align="start"
                  >
                    <Command
                      filter={(value, search, keywords) => {
                        const name = states?.find(s => s.code === value)?.name;
                        const similarity = checkSimilarity(
                          search,
                          `${value} ${name}` || "",
                        );
                        return similarity;
                      }}
                    >
                      <CommandInput
                        className="text-xl"
                        placeholder="ابحث هنا..."
                      />
                      <CommandList>
                        <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                          لا توجد خيارات.
                        </CommandEmpty>
                        <CommandGroup>
                          {states?.map(item => (
                            <CommandItem
                              key={item.code}
                              value={item.code}
                              onSelect={value => {
                                field.handleChange(old => ({
                                  ...old,
                                  state_code: value || "",
                                  state_name:
                                    states?.find(index => index.code === value)
                                      ?.name || "",
                                  city_code: "",
                                }));
                                setWilayaOpen(false);
                              }}
                              className="text-xl"
                            >
                              <span className="inline-block text-darkblue-400">
                                {item.code}
                              </span>
                              {item.name}
                              <LuCheck
                                className={cn(
                                  "ms-auto",
                                  item.code === field.state.value.state_code
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* field */}
              <div className="field mb-4">
                <Label className="text-xl text-darkblue-500">{"البلدية"}</Label>
                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityOpen}
                      className="h-auto w-full justify-between rounded-md border-2 py-2 text-xl"
                      aria-label="city"
                    >
                      <div className="value h-auto text-xl">
                        {!field.state.value?.city_code ? (
                          <span className="text-darkblue-500">
                            {"اختر بلدية..."}
                          </span>
                        ) : (
                          <span>
                            {cities?.find(
                              index =>
                                index.code === field.state.value?.city_code,
                            )?.name || ""}
                          </span>
                        )}
                      </div>
                      <LuChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[320px] p-0 font-tajawal text-2xl sm:w-[436px]"
                    align="start"
                  >
                    <Command
                      filter={(value, search, keywords) => {
                        const name = cities?.find(s => s.code === value)?.name;
                        const similarity = checkSimilarity(search, name || "");
                        return similarity;
                      }}
                    >
                      <CommandInput
                        className="text-xl"
                        placeholder="ابحث هنا..."
                      />
                      <CommandList>
                        <CommandEmpty className="py-6 text-center text-xl text-darkblue-500">
                          لا توجد خيارات.
                        </CommandEmpty>
                        <CommandGroup>
                          {cities
                            ?.filter(
                              item =>
                                item.state_code ===
                                field.state.value.state_code,
                            )
                            .map(item => (
                              <CommandItem
                                key={item.code}
                                value={item.code}
                                onSelect={value => {
                                  field.handleChange(old => ({
                                    ...old,
                                    city_code: value || "",
                                    city_name:
                                      cities?.find(
                                        index => index.code === value,
                                      )?.name || "",
                                  }));
                                  setCityOpen(false);
                                }}
                                className="text-xl"
                              >
                                {item.name}
                                <LuCheck
                                  className={cn(
                                    "ms-auto",
                                    item.code === field.state.value.city_code
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* field */}
              <div className="field mb-4">
                <Label className="text-xl text-darkblue-500">{"الشارع"}</Label>
                <Textarea
                  className="h-auto py-2 text-xl focus-visible:ring-orange-400"
                  value={field.state.value.street_address}
                  onChange={event =>
                    field.handleChange(old => ({
                      ...old,
                      street_address: event.target.value,
                    }))
                  }
                />
              </div>
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} />
              )}
            </>
          )}
        />

        {/* field */}
        <div className="field mb-6">
          <Label className="text-xl text-darkblue-500">
            {"الموقع الالكتروني"}
          </Label>
          <form.Field
            name="website"
            validators={{}}
            children={field => (
              <>
                <Input
                  type="url"
                  placeholder="https://"
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

        <div className="">
          <Separator className="my-6 mt-12" />
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
          <Label className="text-xl text-darkblue-500">{"كلمة المرور"}</Label>
          <form.Field
            name="password"
            validators={{
              onChange: yup.string().required("كلمة السر مطلوبة"),
            }}
            children={field => (
              <>
                <Input
                  type="password"
                  placeholder="كلمة السر"
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
          <Label className="text-xl text-darkblue-500">
            {"تأكيد كلمة المرور"}
          </Label>
          <form.Field
            name="confirm_password"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({value, fieldApi}) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "كلمات السر غير متطابقة";
                }
                return undefined;
              },
            }}
            children={field => (
              <>
                <Input
                  type="password"
                  placeholder="تأكيد كلمة السر"
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
      </div>

      <div className="mb-12 flex justify-center">
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit || isSubmitting}
              variant={"default"}
              onClick={() => {
                form.handleSubmit();
              }}
              className="bg-darkblue-700 pt-3 text-xl transition-colors hocus:bg-darkblue-950"
            >
              {isSubmitting && <Loader2 className="animate-spin" />}
              التسجيل
            </Button>
          )}
        />
      </div>
    </div>
  );
};

export default RegisterForm;

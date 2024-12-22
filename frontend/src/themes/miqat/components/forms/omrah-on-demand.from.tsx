/* eslint-disable react/no-children-prop */

"use client";

import React from "react";
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
import { Textarea } from "@/components/ui/textarea";

const logger = initLogger(LoggerContext.FORM, "OmrahOnDemandForm");

type ApiData = {
  first_name: string;
  family_name: string;
  phone: string;
  email: string;
  program: string;
};
export type LoginFormProps = {};

type Props = {};

const OmrahOnDemandForm: React.FC<Props> = ({}) => {
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

  /* -------------------------------------------------------------------------- */
  /*                                    FORM                                    */
  /* -------------------------------------------------------------------------- */
  const form = useForm<
    Levelup.CMS.V1.Utils.DeepComplete<ApiData>,
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      first_name: "",
      family_name: "",
      phone: "",
      email: "",
      program: "",
    },

    onSubmit: async ({value}) => {
      const payload: {data: ApiData} = {
        data: {
          ...value,
        },
      };

      try {
        const {data} = await sdk.auth.auth.login(payload);

        if (data?.user?._id) {
          // router.push(
          //   setPathParams(publicRoutes.homepage._.myAccount.path, { id: data?.user?._id }),
          // );
          logger.success("authenticating", data.user.email);
          dispatch(authenticate(data));
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
        <Label className="text-xl text-darkblue-500">{"رقم الهاتف"}</Label>
        <form.Field
          name="program"
          validators={{
            onChange: yup.string().required("البرنامج مطلوب"),
          }}
          children={field => (
            <>
              <Textarea
                rows={6}
                placeholder="البرنامج"
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
  );
};

export default OmrahOnDemandForm;

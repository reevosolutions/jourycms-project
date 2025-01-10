/* eslint-disable react/no-children-prop */
"use client";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useForm, type Validator } from "@tanstack/react-form";
import * as React from "react";
import * as yup from "yup";

import useCMSContent from "@/hooks/use-cms-content";
import { useAppDispatch } from "@/lib/redux/hooks";
import { yupValidator } from "@tanstack/yup-form-adapter";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const logger = initLogger(LoggerContext.FORM, "ChangePasswordForm");

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth.ChangePassword;
export type ChangePasswordFormProps = {};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {getWebsiteConfigValue, getArticleTypeBySlug} = useCMSContent();
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                    FORM                                   */
  /* -------------------------------------------------------------------------- */
  const form = useForm<
    Levelup.CMS.V1.Utils.DeepComplete<ApiAlias.Request["data"]> & {
      confirm_password: string;
    },
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },

    onSubmit: async ({value}) => {
      const payload: ApiAlias.Request = {
        data: {
          ...value,
        },
      };

      try {
        const {data} = await sdk.auth.auth.changePassword(payload);

        if (data?.user?._id) {
          // router.push(
          //   setPathParams(publicRoutes.homepage._.myAccount.path, { id: data?.user?._id }),
          // );
          logger.success("change password", data.user.email);
          toast.success("تم تغيير كلمة المرور بنجاح");
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
        <h2 className="mb-6 text-center text-3xl font-bold text-darkblue-950">
          تغيير كلمة المرور
        </h2>

        {/* field */}
        <div className="field mb-6">
          <Label className="text-xl text-darkblue-500">
            {"كلمة المرور القديمة"}
          </Label>
          <form.Field
            name="old_password"
            validators={{
              onChange: yup.string().required("كلمة السر مطلوبة"),
            }}
            children={field => (
              <>
                <Input
                  type="password"
                  // placeholder="كلمة السر القديمة"
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
            {"كلمة المرور الجديدة"}
          </Label>
          <form.Field
            name="new_password"
            validators={{
              onChange: yup.string().required("كلمة السر مطلوبة"),
            }}
            children={field => (
              <>
                <Input
                  type="password"
                  // placeholder="كلمة السر الجديدة"
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
              onChangeListenTo: ["new_password"],
              onChange: ({value, fieldApi}) => {
                if (value !== fieldApi.form.getFieldValue("new_password")) {
                  return "كلمات السر غير متطابقة";
                }
                return;
              },
            }}
            children={field => (
              <>
                <Input
                  type="password"
                  // placeholder="تأكيد كلمة السر"
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

        <div className="mb-2 mt-8 flex justify-center">
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
                {"تغيير كلمة المرور"}
              </Button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;

/* eslint-disable react/no-children-prop */
"use client";

import { authenticate } from "@features/auth/redux/slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import initLogger, { LoggerContext } from "@/lib/logging";
import * as React from "react";
import Link from "next/link";
import * as yup from "yup";
import { useSdk } from "@/hooks/use-sdk";
import { publicRoutes } from "@/config";
import { FormMessage } from "@/components/ui/customized.form";
import { cn } from "@/lib/utils";
import { useForm, type Validator } from "@tanstack/react-form";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { setPathParams } from "@/lib/routes";
import { toast } from "sonner";
import { yupValidator } from "@tanstack/yup-form-adapter";
import useCMSContent from "@/hooks/use-cms-content";

const logger = initLogger(LoggerContext.FORM, 'LoginForm');

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth.Signin;
import { Loader2 } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
export type LoginFormProps = {};


const LoginForm: React.FC<LoginFormProps> = ({ }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { getWebsiteConfigValue, getArticleTypeBySlug } = useCMSContent();
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                    FORRM                                   */
  /* -------------------------------------------------------------------------- */
  const form = useForm<Levelup.CMS.V1.Utils.DeepComplete<ApiAlias.Request['data']>, Validator<unknown, yup.AnySchema>>(
    {
      defaultValues: {
        email: 'dev@mail.com',
        password: '123',
      },

      onSubmit: async ({ value }) => {
        const payload: ApiAlias.Request = {
          data: {
            ...value
          },
        };

        try {

          const { data } = await sdk.auth.auth.login(payload);

          if (data?.user?._id) {
            // router.push(
            //   setPathParams(publicRoutes.homepage._.myAccount.path, { id: data?.user?._id }),
            // );
            logger.success("authenticating", data.user.email);
            dispatch(authenticate(data));
          }
        } catch (error: any) {
          toast.error(error.message, {

          })
        }
      },
      validatorAdapter: yupValidator(),
    },
  );

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="">

      <div className="px-4 py-6 max-w-full ">
        <h2 className="text-3xl  text-center mb-6 font-bold text-darkblue-950">تسجيل الدخول</h2>

        {/* field */}
        <div className="field mb-6">
          <Label className="text-2xl text-darkblue-500">{"البريد الالكتروني"}</Label>
          <form.Field
            name="email"
            validators={{
              onChange: yup.string().email(
                "البريد الالكتروني غير صحيح"
              ).required("البريد الالكتروني مطلوب"),
            }}
            children={field => (
              <>

                <Input
                  type="email"
                  placeholder="البريد الالكتروني"
                  className="focus-visible:ring-orange-400"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
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
          <Label className="text-2xl text-darkblue-500">{"كلمة المرور"}</Label>
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
                  className="focus-visible:ring-orange-400"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <FormMessage error={field.state.meta.errors?.[0]} />
                )}
              </>
            )}
          />
        </div>

        <div className="flex justify-center mb-2 mt-8">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                disabled={!canSubmit || isSubmitting}
                variant={"default"}
                onClick={() => {
                  form.handleSubmit();
                }}
                className=" text-2xl bg-darkblue-700 hocus:bg-darkblue-950 transition-colors"
              >
                {isSubmitting && <Loader2 className="animate-spin" />}

                تسجيل الدخول</Button>
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
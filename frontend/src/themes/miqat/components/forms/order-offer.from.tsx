/* eslint-disable react/no-children-prop */

"use client";

import { FormMessage } from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useForm, type Validator } from "@tanstack/react-form";
import React from "react";
import * as yup from "yup";

import { useAppDispatch } from "@/lib/redux/hooks";
import { yupValidator } from "@tanstack/yup-form-adapter";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import { TCustomArticle } from "../../data/ar.types.seed";

const logger = initLogger(LoggerContext.FORM, "OrderOfferForm");

import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
type FormDataFields = {
  article_id: string;
  article_slug: string;
  article_title: string;
  agency_id: string;
  agency_name?: string;
  article_type?: string;
  phone: string;
};

export type LoginFormProps = {};

type Props = {
  article: TCustomArticle<"omrah">;
  agency_name?: string;
  article_type?: string;
};

const OrderOfferForm: React.FC<Props> = ({
  article,
  agency_name,
  article_type,
}) => {
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
    Levelup.CMS.V1.Utils.DeepComplete<FormDataFields>,
    Validator<unknown, yup.AnySchema>
  >({
    defaultValues: {
      article_id: "",
      article_slug: "",
      article_title: "",
      agency_id: "",
      agency_name: "",
      article_type: "",
      phone: "",
    },

    onSubmit: async ({value, formApi}) => {
      const payload: ApiAlias.Create.Request<FormDataFields> = {
        data: {
          form: "order-offer",
          data: {
            ...value,
            article_id: article._id,
            article_slug: article.slug,
            article_title: article.title,
            agency_id: article.meta_fields.agency,
            agency_name,
            article_type,
          },
        },
      };

      try {
        const {data} = await sdk.content.formEntries.create(payload);

        if (data) {
          logger.success("posted", data);
          toast.success("تم إرسال الطلب بنجاح، سيتم التواصل معك في أقرب وقت");
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
    <div className="form my-2 mt-4 flex items-center gap-4 rounded-xl border border-gray-200 p-1">
      {/* field */}
      <div className="field flex-grow">
        <form.Field
          name="phone"
          validators={{
            onChange: yup.string().required("رقم الهاتف مطلوب"),
          }}
          children={field => (
            <>
              <Input
                placeholder="رقم الهاتف"
                className="h-auto border-0 py-2 text-xl shadow-none focus-within:border-none focus-visible:ring-0"
                value={field.state.value}
                onChange={event => field.handleChange(event.target.value)}
              />
              {field.state.meta.errors?.[0] && (
                <FormMessage error={field.state.meta.errors?.[0]} className="px-4" />
              )}
            </>
          )}
        />
      </div>

      <div className="">
        <form.Subscribe
          selector={state => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="inline-flex gap-4 rounded-lg bg-darkblue-700 px-4 pb-2 pt-3 text-lg font-bold text-white transition-all disabled:opacity-50 hocus:bg-darkblue-900 sm:px-6 md:px-8"
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

export default OrderOfferForm;

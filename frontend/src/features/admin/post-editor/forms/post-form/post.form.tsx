"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/customized.form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
import { yupValidator } from "@tanstack/yup-form-adapter";
import * as yup from "yup";
import { Tiptap } from "@/features/editors/tiptap";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/customized.sidebar";
import articleTypesSeedData from "@/lib/seed/miqat/ar.types.seed";
import CustomMetaField from "../../custom-fields";
import { useQuery } from "@tanstack/react-query";
import { useForm, Validator } from "@tanstack/react-form";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { adminRoutes } from "@/config";
import { setPathParams } from "@/lib/routes";

type Props = {
  articleType_slug?: string;
  article_id?: string;
  onSubmit?: (data: EntityAlias) => void | PromiseLike<void>;
  onError?: (error: any) => void | PromiseLike<void>;
};

const PostForm: React.FC<Props> = ({
  onSubmit,
  onError,
  articleType_slug,
  article_id,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [article, setArticle] = useState<EntityAlias | null>(null);
  const [body, setBody] = useState("");
  const [structuredBody, setStructuredBody] = useState<{ [Key: string]: any }>(
    {},
  );
  const [articleType, setArticleType] =
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);

  const [metaFields, setMetaFields] = useState<
    Levelup.CMS.V1.Content.Entity.ICustomMetaField[]
  >(Object.values([]));
  const [metaFieldsData, setMetaFieldsData] = useState<{
    [key: string]: any;
  }>({});
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const articleTypeQuery = useQuery({
    queryKey: ["articleType", articleType_slug],
    enabled: !!articleType_slug,
    queryFn: async () => {
      if (articleType_slug) {
        const data = await sdk.content.articleTypes.getBySlug(articleType_slug);
        setArticleType(data?.data || null);
        setMetaFields(data?.data?.custom_meta_fields || []);
        return data;
      }
      return null;
    },
  });

  const articleQuery = useQuery({
    queryKey: ["articleType", article_id],
    enabled: !!article_id,

    queryFn: async () => {
      if (article_id) {
        const { data: article } =
          await sdk.content.articles.getById(article_id);
        setArticle(article || null);
        if (article?.article_type) {
          const { data: type } = await sdk.content.articleTypes.getById(
            article.article_type,
          );
          setArticleType(type || null);
          setMetaFields(type?.custom_meta_fields || []);
        }
      }
      return null;
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */
  const form = useForm<Partial<EntityAlias>, Validator<unknown, yup.AnySchema>>(
    {
      defaultValues: {
        title: "",
        body: "",
        article_type: undefined,
        ...(article || {}),
      },

      onSubmit: async ({ value }) => {
        const payload: ApiAlias.Create.Request = {
          data: {
            title: value.title,
            body,
            body_structured: structuredBody,
            article_type: articleType?._id,
            meta_fields: metaFieldsData,
          },
        };

        const { data } = await sdk.content.articles.create(payload);

        if (data._id) {
          router.push(
            setPathParams(adminRoutes.articles._.edit.path, { id: data._id }),
          );
        }
      },
      validatorAdapter: yupValidator(),
    },
  );
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {
    if (article) {
      setMetaFieldsData(article?.meta_fields || {});
      setBody(article?.body || "");
      setStructuredBody(article?.body_structured || {});
      setMetaFieldsData(article?.meta_fields || {});
    }
  }, [article]);

  const handleMetaFieldChange = useCallback((key: string, value: any) => {
    setMetaFieldsData(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData, article]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-form">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          <h1 className="up-page-title mb-4 text-xl font-bold">
            {article_id
              ? articleType?.labels.edit || tLabel("Edit post")
              : articleType?.labels.create || tLabel("New post")}
          </h1>
          <form.Field
            name="title"
            validators={{
              onChange: yup.string().required("Title required"),
            }}
            children={field => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={tLabel("Article title")}
                    className="hocus:ring-none h-16 border-none text-3xl font-bold shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 hocus:shadow-none"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <Tiptap
              content={body}
              defaultContent={body}
              onChange={({ content, json }) => {
                logger.debug("Tiptap content change", { content, json });
                setBody(content);
                setStructuredBody(json);
              }}
            />
          </FormItem>
        </section>
        <div className="min-h-screen w-96 flex-shrink-0 rounded-lg bg-body-900/50">
          <SidebarHeader className="sticky top-0 z-10 mb-4 rounded-t-lg bg-body-950 px-4">
            <FormItem className="flex flex-row justify-end border-b border-body-800 py-4">
              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    onClick={form.handleSubmit}
                  >
                    {isSubmitting ? "submitting" : "Submit"}
                  </Button>
                )}
              />
            </FormItem>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <aside className="meta-fields flex flex-col gap-4">
                {metaFields.map(field => (
                  <CustomMetaField
                    key={field.field_key}
                    field={field}
                    onChange={(value: any) =>
                      handleMetaFieldChange(field.field_key, value)
                    }
                    value={metaFieldsData[field.field_key]}
                  />
                ))}
              </aside>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

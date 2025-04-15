/* eslint-disable react/no-children-prop */
"use client";

import {useForm, type Validator} from "@tanstack/react-form";
import {useQuery} from "@tanstack/react-query";
import {yupValidator} from "@tanstack/yup-form-adapter";
import React, {useCallback, useEffect, useState} from "react";
import * as yup from "yup";

import {Button} from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/customized.form";
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/customized.sidebar";
import {Input} from "@/components/ui/input";
import {Tiptap} from "@/features/editors/tiptap";
import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";

import {adminRoutes} from "@/config";
import {setPathParams} from "@/lib/routes";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import CustomMetaField from "../../custom-fields";
import {LuExternalLink, LuLoader2} from "react-icons/lu";
import ImageUploader from "@/features/storage/form-components/image.uploader";
import {cn} from "@/lib/utils";
import BreadcrumbComponent from "@/features/admin/presentation/breadcrumb";
import Link from "next/link";
import {toast} from "sonner";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;

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
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [article, setArticle] = useState<EntityAlias | null>(null);
  const [body, setBody] = useState("");
  const [structuredBody, setStructuredBody] = useState<{[Key: string]: any}>(
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
    queryKey: ["articleType", articleType_slug, article_id],
    enabled: !!articleType_slug && !article_id,
    queryFn: async () => {
      if (articleType_slug && !article_id) {
        const data = await sdk.content.articleTypes.getBySlug(articleType_slug);
        setArticleType(data?.data || null);
        setMetaFields(data?.data?.custom_meta_fields || []);
        return data;
      }
      return null;
    },
  });

  const articleQuery = useQuery({
    queryKey: ["article", article_id],
    enabled: !!article_id,

    queryFn: async () => {
      if (article_id) {
        const {data: article} = await sdk.content.articles.getById(article_id);
        setArticle(article || null);
        if (article?.article_type) {
          const {data: type} = await sdk.content.articleTypes.getById(
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
        ...article,
      },

      onSubmit: async ({value}) => {
        try {
          const payload: ApiAlias.Create.Request = {
            data: {
              ...value,
              body,
              body_structured: structuredBody,
              article_type: articleType?._id,
              meta_fields: metaFieldsData,
            },
          };

          const {data} = article_id
            ? await sdk.content.articles.update(article_id, payload)
            : await sdk.content.articles.create(payload);

          toast.success("تم حفظ المقال بنجاح");
          if (data._id) {
            router.push(
              setPathParams(adminRoutes.articles._.edit.path, {id: data._id}),
            );
          }
        } catch (error: any) {
          toast.error("حدث خطأ أثناء حفظ المقال");
          logger.error(error.message);
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
      setBody(article?.body || "");
      setStructuredBody(article?.body_structured || {});
      setMetaFieldsData(article?.meta_fields || {});
    }
  }, [article]);

  const handleMetaFieldChange = useCallback((key: string, value: any) => {
    setMetaFieldsData(previous => ({
      ...previous,
      [key]: value,
    }));
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData, article]);

  const applyFieldConstraints = useCallback(
    (field: Levelup.CMS.V1.Content.Entity.ICustomMetaField) => {
      if (!field.field_options?.constraints) return true;
      if (!Array.isArray(field.field_options.constraints)) return true;
      if (field.field_options.constraints.length === 0) return true;

      for (const constraint of field.field_options.constraints) {
        if (constraint.field) {
          if (constraint.operator === "eq") {
            return metaFieldsData[constraint.field] === constraint.value;
          }
          if (constraint.operator === "ne") {
            return metaFieldsData[constraint.field] !== constraint.value;
          }
          if (constraint.operator === "gt") {
            return metaFieldsData[constraint.field] > constraint.value;
          }
          if (constraint.operator === "lt") {
            return metaFieldsData[constraint.field] < constraint.value;
          }
          if (constraint.operator === "gte") {
            return metaFieldsData[constraint.field] >= constraint.value;
          }
          if (constraint.operator === "lte") {
            return metaFieldsData[constraint.field] <= constraint.value;
          }
          if (constraint.operator === "in") {
            return constraint.value.includes(metaFieldsData[constraint.field]);
          }
          if (constraint.operator === "nin") {
            return !constraint.value.includes(metaFieldsData[constraint.field]);
          }
          if (constraint.operator === "exists") {
            return metaFieldsData[constraint.field] !== undefined;
          }
          if (constraint.operator === "not_empty") {
            return (
              metaFieldsData[constraint.field] !== "" &&
              metaFieldsData[constraint.field] !== undefined &&
              metaFieldsData[constraint.field] !== null
            );
          }
        }
      }
    },
    [metaFieldsData],
  );

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-form">
      <div className="flex flex-col gap-4 lg:flex-row">
        <section className="flex-grow pt-6">
          <div className="mb-4">
            <BreadcrumbComponent
              items={[
                {
                  title: tLabel("الرئيسية"),
                  path: `/admin/`,
                },
                {
                  title: articleType?.labels.list || tLabel("Posts"),
                  path: `/admin/articles/types/${articleType?.slug}`,
                },
                {
                  title: articleType?.labels.create || tLabel("Create Post"),
                },
              ]}
            />
          </div>

          <h1 className="up-page-title mb-4 text-xl font-bold">
            {article_id
              ? articleType?.labels.edit || tLabel("Edit post")
              : articleType?.labels.create || tLabel("New post")}
          </h1>

          <form.Field
            name="title"
            validators={{
              onChange: yup.string().required("العنوان مطلوب"),
            }}
            children={field => (
              <FormItem>
                <FormControl error={field.state.meta.errors?.[0] as string}>
                  <Input
                    placeholder={tLabel("عنوان المقال")}
                    className="hocus:ring-none h-16 border-none text-3xl font-bold shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0 hocus:shadow-none"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={event => field.handleChange(event.target.value)}
                  />
                </FormControl>
                <FormMessage error={field.state.meta.errors?.[0] as string} />
              </FormItem>
            )}
          />

          <form.Field
            name="featured_image"
            validators={{}}
            children={field => (
              <div className="mb-6">
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
                  imageRatio={21 / 9}
                  containerClassname={cn(
                    "w-full flex-grow rounded-lg overflow-hidden",
                    field.state.value ? "aspect-21/9" : "h-72",
                  )}
                  dimensions={{
                    width: 1500,
                    height: (1500 * 9) / 21,
                  }}
                  placeholder={
                    <div className="flex w-full flex-col items-center justify-center text-center">
                      <Image
                        src="/cms/assets/svg/upload-image.svg"
                        width={100}
                        height={100}
                        alt="featured image"
                      />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {tLabel("تحميل صورة مميزة")}
                      </p>
                    </div>
                  }
                />
              </div>
            )}
          />
          <FormItem>
            <Tiptap
              content={body}
              defaultContent={body}
              onChange={({content, json}) => {
                logger.debug("Tiptap content change", {content, json});
                setBody(content);
                setStructuredBody(json);
              }}
            />
          </FormItem>
        </section>
        <div className="w-full flex-shrink-0 rounded-lg bg-body-900/50 lg:min-h-screen lg:w-96">
          <SidebarHeader className="sticky top-0 z-10 mb-4 rounded-t-lg bg-body-950 px-4">
            <FormItem className="flex flex-row items-center justify-end gap-3 border-b border-body-800 py-4">
              {article?.slug && (
                <Link
                  href={`/${article.slug}`}
                  className="mt-1 rounded-md bg-slate-200 p-3 py-[11px] text-slate-950 transition-all hocus:bg-slate-400"
                >
                  <LuExternalLink className="h-5 w-5" />
                </Link>
              )}
              <form.Subscribe
                selector={state => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    onClick={form.handleSubmit}
                  >
                    {isSubmitting && <LuLoader2 className="animate-spin" />}
                    {isSubmitting ? "جار الحفظ" : "حفظ"}
                  </Button>
                )}
              />
            </FormItem>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <aside className="meta-fields flex flex-col gap-4 px-4 pb-6">
                {metaFields.map(field =>
                  applyFieldConstraints(field) ? (
                    <CustomMetaField
                      key={field.field_key}
                      field={field}
                      onChange={(value: any) =>
                        handleMetaFieldChange(field.field_key, value)
                      }
                      value={metaFieldsData[field.field_key]}
                      metaData={metaFieldsData}
                    />
                  ) : null,
                )}
              </aside>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

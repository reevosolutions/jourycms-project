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

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
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
import initLogger, { LoggerContext } from "@/lib/logging";


const logger = initLogger(LoggerContext.FORM, 'article');

type Props = {
  articleType: string;
  data?: EntityAlias;
  onSubmit?: (data: EntityAlias) => void | PromiseLike<void>;
  onError?: (error: any) => void | PromiseLike<void>;
};

const PostForm: React.FC<Props> = ({ data, onSubmit, onError, articleType }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [body, setBody] = useState("");
  const [type, setType] = useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [metaFields, setMetaFields] = useState<
    Levelup.CMS.V1.Content.Entity.ICustomMetaField[]
  >(Object.values(articleTypesSeedData.custom_meta_fields));
  const [metaFieldsData, setMetaFieldsData] = useState<{
    [key: string]: any;
  }>({});
  const [title, setTitle] = useState('');
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {
    /**
     * ---
     */
  }, []);


  const handleMetaFieldChange = useCallback((key: string, value: any) => {
    setMetaFieldsData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);


  const handleSubmit = useCallback(() => {

    logger.value('data', {
      title: title,
      body: body,
      _type: type?._id || null,
      meta_fields: metaFieldsData,
    });
  }, [body, metaFieldsData, onSubmit, title, type]);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-form">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          <FormItem>
            <FormControl>
              <Input
                placeholder="Title"
                className="hocus:shadow-none hocus:ring-none h-16 border-none text-3xl font-bold shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0"
                onChange={event => setTitle(event.target.value)}
                value={title}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <Tiptap content={body} onChange={setBody} />
          </FormItem>


        </section>
        <div className="bg-body-900/50 w-96 rounded-lg min-h-screen flex-shrink-0">
          <SidebarHeader className="bg-body-950 sticky top-0 z-10 mb-4 rounded-t-lg px-4">
            <FormItem className="border-body-800 flex flex-row justify-end border-b py-4">
              <Button onClick={() => {
                handleSubmit();
              }}>Save</Button>
            </FormItem>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <aside className="meta-fields flex flex-col gap-4">
                {metaFields.map(field => (
                  <CustomMetaField key={field.field_key} field={field} onChange={(value: any) => handleMetaFieldChange(field.field_key, value)} value={metaFieldsData[field.field_key]} />
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

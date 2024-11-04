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

type Props = {
  data?: EntityAlias;
  onSubmit?: (data: EntityAlias) => void | PromiseLike<void>;
  onError?: (error: any) => void | PromiseLike<void>;
};

const PostForm: React.FC<Props> = ({ data, onSubmit, onError }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [content, setContent] = useState("");

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
        <section className="flex-grow">
          <FormItem>
            <FormControl>
              <Input
                placeholder="Title"
                className="hocus:shadow-none hocus:ring-none h-16 border-none text-3xl font-bold shadow-none focus:shadow-none focus-visible:shadow-none focus-visible:ring-0"
                onChange={event => console.log(event.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <Tiptap content={content} onChange={setContent} />
          </FormItem>
        </section>
        <div className="bg-body-900/50 w-96 rounded-lg min-h-screen">
          <SidebarHeader className="bg-body-950 sticky top-0 z-10 mb-4 rounded-t-lg px-4">
            <FormItem className="border-body-800 flex flex-row justify-end border-b py-4">
              <Button onClick={() => onSubmit?.(data!)}>Save</Button>
            </FormItem>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="">category</div>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

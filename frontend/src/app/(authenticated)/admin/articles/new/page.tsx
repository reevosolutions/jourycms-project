"use client";

import AdminLayout from "@/features/admin/layout";
import PostForm from "@/features/admin/post-editor/forms/post-form/form";
import { Tiptap } from "@/features/editors/tiptap";
import React, { useState } from "react";

export default function Page() {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout title="New post">
      <PostForm articleType={""}      
      />
    </AdminLayout.PageLayout>
  );
}

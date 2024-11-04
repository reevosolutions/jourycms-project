"use client";

import { type Editor } from "@tiptap/react";
import React from "react";
import {
  LuBold,
  LuCode,
  LuHeading2,
  LuItalic,
  LuList,
  LuListOrdered,
  LuQuote,
  LuRedo,
  LuStrikethrough,
  LuUnderline,
  LuUndo,
} from "react-icons/lu";
import { twMerge } from "tailwind-merge";

type Props = {
  editor: Editor | null;
  content: string;
};

const ToolbarButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={event => {
        event.preventDefault();
        onClick();
      }}
      className={twMerge(
        "lup-editor-button rounded-xs p-1",
        isActive
          ? "lup-editor-button-active bg-body-800 text-primary"
          : "lup-editor-button-inactive text-text-500",
      )}
    >
      {children}
    </button>
  );
};

const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="border-text-200 flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md rounded-tr-md border px-3 py-2">
      <div className="flex w-full flex-wrap items-center justify-start gap-3 lg:w-10/12">
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
          isActive={editor.isActive("bold")}
        >
          <LuBold className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
          }}
          isActive={editor.isActive("italic")}
        >
          <LuItalic className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
          isActive={editor.isActive("underline")}
        >
          <LuUnderline className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
          }}
          isActive={editor.isActive("strike")}
        >
          <LuStrikethrough className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <LuHeading2 className="h-5 w-5" />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
          isActive={editor.isActive("bulletList")}
        >
          <LuList className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
          isActive={editor.isActive("orderedList")}
        >
          <LuListOrdered className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
          }}
          isActive={editor.isActive("blockquote")}
        >
          <LuQuote className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().setCode().run();
          }}
          isActive={editor.isActive("code")}
        >
          <LuCode className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().undo().run();
          }}
          isActive={editor.isActive("undo")}
        >
          <LuUndo className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => {
            editor.chain().focus().redo().run();
          }}
          isActive={editor.isActive("redo")}
        >
          <LuRedo className="h-5 w-5" />
        </ToolbarButton>
      </div>
    </div>
  );
};

export default Toolbar;

"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./toolbar.tiptap";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useEffect } from "react";


const logger = initLogger(LoggerContext.COMPONENT, 'tiptap');

type Props = {
  onChange: ({
    content,
    json,
  }: {
    content: string;
    json: Record<string, any>;
  }) => void;
  content: string;
  defaultContent: string;
};

const Tiptap: React.FC<Props> = ({ onChange, content, defaultContent = '' }) => {

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 justify-start border-b border-r min-h-[400px] border-l border-foreground-200 text-foreground items-start w-full font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange({
        content: editor.getHTML(),
        json: editor.getJSON(),
      });
    },
    content: content || '',
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(defaultContent);
    }
  }, [defaultContent]);
  
  return (
    <div className="w-full">
      <Toolbar editor={editor} content={content} />
      <div className="prose max-w-none prose-p:mt-0">
        <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
      </div>
    </div>
  );
};

export default Tiptap;

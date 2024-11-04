"use client";

import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Toolbar from "./toolbar.tiptap";

type Props = {
  onChange: (content: string) => void;
  content: string;
};

const Tiptap: React.FC<Props> = ({ onChange, content }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
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
      handleChange(editor.getHTML());
    },
  });

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

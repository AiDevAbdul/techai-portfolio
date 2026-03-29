'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-primary-action rounded-lg overflow-hidden">
      <div className="bg-primary-section border-b border-primary-action p-2 flex gap-2 flex-wrap">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('bold')
              ? 'bg-primary-action text-white'
              : 'bg-primary-bg text-text-primary hover:bg-primary-action/20'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('italic')
              ? 'bg-primary-action text-white'
              : 'bg-primary-bg text-text-primary hover:bg-primary-action/20'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-primary-action text-white'
              : 'bg-primary-bg text-text-primary hover:bg-primary-action/20'
          }`}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive('bulletList')
              ? 'bg-primary-action text-white'
              : 'bg-primary-bg text-text-primary hover:bg-primary-action/20'
          }`}
        >
          List
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none bg-primary-bg p-4 text-text-primary"
      />
    </div>
  );
}

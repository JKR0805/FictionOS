import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useChapter, useUpdateChapter } from '@/hooks/useNovels'
import { Skeleton } from '@/components/ui/Skeleton'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import LinkExtension from '@tiptap/extension-link'
import { 
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Subscript as SubscriptIcon, Superscript as SuperscriptIcon,
  Code, TerminalSquare, Link as LinkIcon, Minus, Eraser
} from 'lucide-react'

const MenuBar = ({ editor }) => {
  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="row" style={{ gap: 'var(--space-2)', padding: 'var(--space-2)', borderBottom: '1px solid var(--border)', background: 'var(--bg)', flexWrap: 'wrap' }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('bold') ? 'is-active' : ''}`}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('italic') ? 'is-active' : ''}`}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('underline') ? 'is-active' : ''}`}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('strike') ? 'is-active' : ''}`}
        title="Strikethrough"
      >
        <Strikethrough size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleHighlight().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('highlight') ? 'is-active' : ''}`}
        title="Highlight"
      >
        <Highlighter size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('subscript') ? 'is-active' : ''}`}
        title="Subscript"
      >
        <SubscriptIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('superscript') ? 'is-active' : ''}`}
        title="Superscript"
      >
        <SuperscriptIcon size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('bulletList') ? 'is-active' : ''}`}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('orderedList') ? 'is-active' : ''}`}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('blockquote') ? 'is-active' : ''}`}
        title="Blockquote"
      >
        <Quote size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`btn btn-ghost btn-icon ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
        title="Align Left"
      >
        <AlignLeft size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`btn btn-ghost btn-icon ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
        title="Align Center"
      >
        <AlignCenter size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`btn btn-ghost btn-icon ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
        title="Align Right"
      >
        <AlignRight size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`btn btn-ghost btn-icon ${editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}`}
        title="Justify"
      >
        <AlignJustify size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('code') ? 'is-active' : ''}`}
        title="Code"
      >
        <Code size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`btn btn-ghost btn-icon ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
        title="Code Block"
      >
        <TerminalSquare size={16} />
      </button>
      <button
        onClick={setLink}
        className={`btn btn-ghost btn-icon ${editor.isActive('link') ? 'is-active' : ''}`}
        title="Link"
      >
        <LinkIcon size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="btn btn-ghost btn-icon"
        title="Horizontal Rule"
      >
        <Minus size={16} />
      </button>
      <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 var(--space-1)' }} />
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
        className="btn btn-ghost btn-icon"
        title="Clear Formatting"
      >
        <Eraser size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="btn btn-ghost btn-icon"
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="btn btn-ghost btn-icon"
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  )
}

export default function ChapterEditorPage() {
  const { novelId, chapterId } = useParams()
  const navigate = useNavigate()
  const { data: chapter, isLoading } = useChapter(chapterId)
  const updateChapter = useUpdateChapter()

  const [title, setTitle] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      LinkExtension.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Write your story here...',
      }),
    ],
    content: '',
  })

  useEffect(() => {
    if (chapter) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(chapter.title)
      if (editor && chapter.content && editor.getHTML() !== chapter.content) {
        editor.commands.setContent(chapter.content)
      }
    }
  }, [chapter, editor])

  const handleSave = (status) => {
    if (!editor) return
    const content = editor.getHTML()
    updateChapter.mutate(
      { chapterId, chapterData: { title, content, status } },
      {
        onSuccess: () => {
          navigate(`/author/novel/${novelId}/chapters`)
        }
      }
    )
  }

  if (isLoading) {
    return (
      <div className="stack-lg" style={{ padding: 'var(--space-4)' }}>
        <Skeleton style={{ height: '40px', width: '50%' }} />
        <Skeleton style={{ height: '400px' }} />
      </div>
    )
  }

  return (
    <div className="stack-lg" style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 'var(--space-4)' }}>
      <div className="row-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Chapter Title"
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            flex: 1,
            color: 'var(--fg)'
          }}
        />
        <div className="row" style={{ gap: 'var(--space-2)' }}>
          <button className="btn btn-ghost" onClick={() => navigate(`/author/novel/${novelId}/chapters`)}>Cancel</button>
          <button
            className="btn"
            onClick={() => handleSave(chapter?.status === 'published' ? 'published' : 'draft')}
            disabled={updateChapter.isPending}
          >
            Save Draft
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSave(chapter?.status === 'published' ? 'draft' : 'published')}
            disabled={updateChapter.isPending}
          >
            {chapter?.status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)', overflow: 'hidden' }}>
        <MenuBar editor={editor} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <EditorContent 
              editor={editor} 
              className="tiptap-editor"
              style={{ minHeight: '500px' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

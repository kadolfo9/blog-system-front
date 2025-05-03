import { PostEditor } from "@/components/posts/editor/post-editor";
import { useState } from "react";

export function PostEditorScreen() {
  const [content, setContent] = useState("");

  return <>
    <div style={{ marginTop: '110px'}}>
      <PostEditor content={content} onChange={(content) => setContent(content)} />
    </div>
  </>
}
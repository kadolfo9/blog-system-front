import { PostEditor } from "@/components/posts/editor/post-editor";
import { useEffect, useState } from "react";

import * as PostsService from "@/services/posts";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function PostCreatorScreen() {
  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {}, [navigate]);

  const handleSave = async () => {
    if (!title) {
      alert("O post precisa de um titulo!");
      return;
    }

    if (title.length < 3) {
      alert("O post precisa ter mais de 3 caracteres para o título.");
      return;
    }

    if (!content) {
      alert("O post precisa de conteúdo.");
      return;
    }

    const response = await PostsService.createPost({
      title,
      content
    });

    if (response.statusCode === 200) {
      navigate(`/posts/${response.postId}`);
    }
  }

  return <>
    <div style={{ marginTop: '90px'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Criar nova publicação</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => {
              navigate(-1)
            }}>Cancelar</Button>
            <Button size="sm" variant="primary" onClick={handleSave}>Criar</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Titulo: </Label>
          <Input size="sm" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter post title" />
        </div>
      </div>

      <PostEditor content={content} onChange={setContent} />
    </div>
  </>
}
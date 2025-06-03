import { PostEditor } from "@/components/posts/editor/post-editor";
import { useEffect, useMemo, useState } from "react";

import * as PostsService from "@/services/posts";
import { PostData } from "@/@types/post";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = { postId: string };

export function PostEditorScreen() {
  const params = useParams<Props>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostData>();
  const [content, setContent] = useState<string>("");
  //const [publishing, setPublishing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const fetchData = useMemo(() => async () => {
    const data = await PostsService.getPost(params.postId!);

    if (data) {
      setPost(data)
      setContent(data.content)
      setTitle(data.title)
    }
  }, [params.postId]);

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handleSave = async () => {
    const response = await PostsService.updatePost(params.postId!, {
      title,
      content
    });

    if (response.statusCode === 200) {
      navigate(`/posts/${params.postId}`);
    }
  }

  return <>
    <div style={{ marginTop: '90px'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{post?.id ? "Editar Publicação" : "Criar nova publicação"}</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => {
              navigate(-1)
            }}>Cancelar</Button>
            <Button size="sm" variant="primary" onClick={handleSave}>Salvar</Button>
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
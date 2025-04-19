import { PostCommentData, PostData } from "@/@types/post";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as PostsService from "@/services/posts";
import * as CommentService from "@/services/comments";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PostComments } from "@/components/posts/post-comments";

export function PostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData>();
  const [comments, setComments] = useState<PostCommentData[]>();

  const fetchData = useMemo(() => async () => {
    const data = await PostsService.getPost(params.postId!);

    if (data) setPost(data);
  }, [params.postId]);

  const fetchComments = useMemo(() => async () => {
    const data = await CommentService.getAllComments(params.postId!);

    if (data) setComments(data);
  }, [params.postId]);

  useEffect(() => {
    fetchData();
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return <>
    <div style={{ marginTop: '5rem' }}>
      <h3 className="text-2xl font-bold center">{post?.title}</h3>

      <h4 className="center">Publicado por: {post?.user.username} | Data: {post?.createdAt}</h4>

      <div style={{ marginTop: '2rem' }} className="text-pretty md:text-balance center text-center break-normal">
        {post?.content}
      </div>

      <div>
        <h2 className="font-bold text-2x1 center" style={{ marginTop: '2rem' }}>Comentários:</h2>
        <div className="grid gap-2 place-items-center items-center justify-center">
          <Textarea placeholder="Insira seu comentário aqui" style={{ width: '300px' }} />
          <Button variant="ghost">Publicar</Button>
        </div>
      </div>

      <div>
        <h2 className="font-bold text-2x1 center" style={{ marginTop: '1rem' }}>Comentários recentes:</h2>
        <PostComments 
          post={post as unknown as PostData} 
          comments={comments as unknown as PostCommentData[]}
        />
      </div>
    </div>
  </>
}
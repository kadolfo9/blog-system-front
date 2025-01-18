import { useAuth } from "@/hooks/use-auth";
import * as PostsService from "@/services/posts";
import { Post as PostModel } from "@/services/posts";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

import "./styles/index.css";

function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<PostModel>();
  const { signed } = useAuth();
  const navigate = useNavigate();

  const fetchPost = useMemo(() => async () => {
    try {
      const post = await PostsService.getPost(params.postId!);

      if (post) {
        setPost(post); // TODO: corrigir erro do browser de nao autorizado.. //
      }
    } catch (e) {
      console.log('error');
      console.log(e);
    }
  }, [params.postId]);

  useEffect(() => {
    fetchPost();
  }, [navigate, params, signed, fetchPost]);

  return (
    <>
      <div className="post-container">
        <div className="post-title">
          <p className="text-4xl">{post?.title}</p>
          <p className="post-author">Publicado por: {post?.user?.username}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{post?.content}</p>
      </div>
    </>
  );
}

export default PostPage;
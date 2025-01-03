import { useAuth } from "@/hooks/use-auth";
import * as PostsService from "@/services/posts";
import { Post as PostModel } from "@/services/posts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";


function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<PostModel>();
  const { signed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const post = await PostsService.getPost(params.postId!);

      if (post) {
        setPost(post); // TODO: corrigir erro do browser de nao autorizado.. //
      }
    }

    getPost();
  }, [navigate, params, signed]);

  return (
    <>
      <div>
        <p>{post?.title}</p>

        <div>
          <p>{post?.content}</p>
        </div>
      </div>
    </>
  );
}

export default PostPage;
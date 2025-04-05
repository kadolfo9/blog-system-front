import { PostData } from "@/@types/post";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as PostsService from "@/services/posts";

export function PostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostData>();

  const fetchData = useMemo(() => async () => {
    const data = await PostsService.getPost(params.postId!);

    if (data) setPost(data);
  }, [params.postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, navigate]);

  return <div>
    <h2>{ post?.title }</h2>
  </div>
}
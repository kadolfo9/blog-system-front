import { useAuth } from "@/hooks/use-auth"
import { useNavigate } from "react-router"
import * as PostService from "@/services/posts"
import { PostData } from "@/@types/post"

import { useState, useEffect } from "react";

export function ProfileScreen() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    PostService.getAllPostsByUserId(auth.user?.id).then((r) => setPosts(r))
  }, [])

  return <></>
}
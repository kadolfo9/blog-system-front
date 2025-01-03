import * as PostsService from "@/services/posts";
import { useState } from "react";

function PostList() {
  const [posts, setPosts] = useState<PostsService.PostList>({ posts: [] });
}

export { PostList };
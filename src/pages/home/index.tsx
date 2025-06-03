import { PostData } from "@/@types/post"
import { PostCard } from "@/components/posts/post-card";
import { useEffect, useMemo, useState } from "react"

import * as PostsService from "@/services/posts"
import { useAuth } from "@/hooks/use-auth";

function HomePage() {
  const auth = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]);

  const fetchData = useMemo(() => async () => {
    const posts = await PostsService.getAllPosts();
    setPosts(posts?.posts as PostData[]);
  }, []);

  useEffect(() => {
    fetchData();
  }, [auth]);

  return <>
    <div className="center" style={{ marginTop: '8rem' }}>
      <div className="grid grid-cols-4 gap-4">
        {posts.length === 0 ? (
          <div className="text-red-500">Nenhum post carregado</div>
        ) : (
          posts.map(post => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  </>
}

export { HomePage }
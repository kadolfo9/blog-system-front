import { useAuth } from "@/hooks/use-auth"
import { useNavigate } from "react-router"
import * as PostService from "@/services/posts"
import { PostData } from "@/@types/post"

import { useState, useEffect } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export function ProfileScreen() {
  const navigate = useNavigate();
  const { user, signed } = useAuth();

  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    PostService
      .getAllPostsByUserId(user?.id as unknown as string)
      .then((r) => setPosts(r))
  }, [navigate, signed, user?.id])

  return <>
    <div className="rounded-md border p-10">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={posts} />
      </div>
    </div>
  </>
}
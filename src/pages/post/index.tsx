import { PostData, PostCommentData } from "@/@types/post";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CalendarIcon, MessageSquare, Share2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router";

import * as PostsService from "@/services/posts";
import * as CommentService from "@/services/comments";
import { PostComments } from "@/components/posts/post-comments";
import { PostCommentsForm } from "@/components/posts/post-comment-form";

export function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<PostData>();
  const [comments, setComments] = useState<PostCommentData[]>([]);

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
  }, []);

  const date = new Date(post?.createdAt as unknown as string);

  return <div className="container mx-auto px-4 py-8 max-w-4xl mt-20 min-h-[80vh]">
    <div className="space-y-4 mb-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          {date.toLocaleString()}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
        {post?.title}
      </h1>

      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10"
          src="/placeholder.svg?height=40&width=40"
          altText="Author"
          fallback={post?.user.username.charAt(0).toUpperCase()}
        />
        <div>
          <p className="font-medium">{post?.user.username}</p>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between mb-8 text-sm text-muted-foreground">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {comments?.length ?? 0} comentário(s)
        </span>
      </div>
      <Button variant="secondary" size="sm" className="flex items-center gap-1">
        <Share2 className="h-4 w-4" />
                  Compartilhar
      </Button>
    </div>

    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />

    <Separator className="my-12" />
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Comentários ({comments?.length ?? 0})</h3>

      <PostCommentsForm postId={post?.id as unknown as string} />

      {comments.map((comment, key) => (
        <PostComments key={key} comment={comment} />
      ))}
    </div>
  </div>
}
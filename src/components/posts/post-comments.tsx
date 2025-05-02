import { PostCommentData } from "@/@types/post";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

type Props = { comment: PostCommentData };

export function PostComments({ comment }: Props) {
  return <>
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10" 
          src="/placeholder.svg?height=40&width=40" 
          altText="Commenter"
          fallback={comment.user?.username.charAt(0).toUpperCase()}
        />
        <div>
          <p className="font-medium">{comment.user?.username}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-pretty md:text-balance break-normal">
        {comment.content}
      </p>
      <Button variant="ghost" size="sm">
                Responder
      </Button>
    </div>
  </>
}
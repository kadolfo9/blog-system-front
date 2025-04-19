import { PostCommentData, PostData } from "@/@types/post";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

type Props = { post: PostData, comments: PostCommentData[] };

export function PostComments({ post, comments } : Props) {
  return <>
    {comments?.map((comment, key) => (
      <>
        <div>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>{comment.user.username}</CardTitle>
              <CardDescription>em: {comment.createdAt}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-pretty md:text-balance text-center break-normal">
                {comment.content}
              </p>
            </CardContent>
          </Card>
        </div>
      </>
    ))}
  </>
}
import { PostData } from "@/@types/post";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { useNavigate } from "react-router";
import { useEffect } from "react";

type Props = { post: PostData };

export function PostCard({ post } : Props) {
  const navigate = useNavigate();
  const { title, createdAt } = post;
  const safeLength = 120;

  let content = post.content;

  if (content.length > safeLength) {
    content = content.slice(0, safeLength) + "...";
  }

  useEffect(() => {}, [navigate]);

  const createDate = new Date(createdAt);

  function handleClick() {
    navigate(`/posts/${post.id}`);
  }

  return <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Publicado em: {createDate.toLocaleString()}</CardDescription>
    </CardHeader>

    <CardContent className="grid gap-4">
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <p>{content}</p>
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex justify-between">
      <Button variant="primary" onClick={handleClick}>Ler mais</Button>
    </CardFooter>
  </Card>
}
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import * as CommentsService from "@/services/comments";
import { useAuth } from "@/hooks/use-auth";

const PostFormSchema = z.object({
  content: z
    .string()
    .min(3, "O conteúdo do comentário precisa ter 3 caracteres, no minimo.")
    .max(100, "O comentário precisa ter menos de 100 caracteres.")
})

type Props = {
    postId: string;
}

export function PostCommentsForm(props: Props) {
  const auth = useAuth();

  const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema)
  })

  function onSubmit(data: z.infer<typeof PostFormSchema>) {
    console.log(data);

    CommentsService.createComment({
      content: data.content,
      postId: props.postId,
      userId: auth.user?.id as unknown as string
    })
      .then(() => window.location.reload())
      .catch((e) => console.log(e));
  }

  return (
    <>
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <Textarea 
            {...register("content")} 
            placeholder="Insira seu comentário aqui" 
            className="w-full p-4 border rounded-lg resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          { errors.content && <p className="p-4">{ errors.content.message }</p> }

          <div className="mt-3">
            <Button type="submit" variant="primary">Publicar</Button>
          </div>
        </form>
      </div>
    </>
  )
}
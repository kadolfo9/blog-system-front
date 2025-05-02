import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Nome de usuário precisa de no minimo de 4 caracteres."}),
  email: z
    .string()
    .email({ message: "Insira um email válido." })
    .min(2, {
      message: "Email precisa de no minimo 4 caracteres.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Senha precisa de no minimo 8 caracteres."
    })
})

export function RegisterScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })
    
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return <Card>
    <CardHeader>
      <CardTitle>Cadastro</CardTitle>
      <CardDescription>
        Cadastre-se e faça novos posts!
      </CardDescription>
    </CardHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <CardBody className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="username">Nome de Usuário</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="example@domain.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel htmlFor="password">Senha</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardBody>
        <CardFooter className="flex justify-between">
          <Button type="submit">Cadastrar</Button>
        </CardFooter>
      </form>
    </Form>
  </Card>
}
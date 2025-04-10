import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ForgotPasswordScreen } from "./forgot";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

import { AuthPayloadInput } from "@/@types/auth";
import { useAuth } from "@/hooks/use-auth";


const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Insira um email válido." })
    .min(2, {
      message: "Email precisa de 2 caracteres.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Senha precisa de 8 caracteres."
    })
})

export function LoginScreen() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [message, setMessage] = useState<{ email: string[], password: string[] }>({
    email: [],
    password: []
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await auth.handleAuth(values as AuthPayloadInput);

    if (response.token) {
      navigate('/dashboard');
      return;
    }

    if (response.error) {
      setMessage({
        email: [response.error?.email as unknown as string],
        password: [response.error?.password as unknown as string] 
      });
      return;
    }
  }

  function getError(error: 'email' | 'password') {
    return message?.[error]?.[0] && typeof message[error] === 'object' ? (
      <Alert variant="destructive" className="bottom-1 space-y-2">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          { message[error] }
        </AlertDescription>
      </Alert>
    ) : null
  }

  return <>
    { getError('email') }
    { getError('password') }

    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
                  Autentique-se e faça novos posts!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <CardContent className="space-y-2">
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Login</Button>
            <ForgotPasswordScreen />
          </CardFooter>
        </form>
      </Form>
    </Card>
  </>
}
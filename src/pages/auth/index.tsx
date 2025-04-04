import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { LoginScreen } from "@/components/auth/login"
import { RegisterScreen } from "@/components/auth/register"

export function AuthPage() {
  return (
    <div className="centralize">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="password">Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginScreen />
        </TabsContent>
        <TabsContent value="password">
          <RegisterScreen />
        </TabsContent>
      </Tabs>
    </div>
  )
}

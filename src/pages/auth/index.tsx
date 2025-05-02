import {
  TabsToggle,
  TabsToggleContent,
  TabsToggleList,
  TabsToggleTrigger,
} from "@/components/ui/tabs"
import { LoginScreen } from "@/components/auth/login"
import { RegisterScreen } from "@/components/auth/register"

export function AuthPage() {
  return (
    <div className="centralize">
      <TabsToggle defaultValue="login" className="w-[420px]">
        <TabsToggleList className="w-full text-center justify-center">
          <TabsToggleTrigger value="login">Login</TabsToggleTrigger>
          <TabsToggleTrigger value="password">Cadastro</TabsToggleTrigger>
        </TabsToggleList>
        <TabsToggleContent value="login">
          <LoginScreen />
        </TabsToggleContent>
        <TabsToggleContent value="password">
          <RegisterScreen />
        </TabsToggleContent>
      </TabsToggle>
    </div>
  )
}

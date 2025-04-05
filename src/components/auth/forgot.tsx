import { Label } from "@radix-ui/react-label";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function ForgotPasswordScreen() {
  // TODO: Drawer?
  return <Popover>
    <PopoverTrigger asChild>
      <Button>Esqueceu a senha?</Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" placeholder="example@domain.com" />
      </div>
      <div className="space-y-2">
        <Button type="button">Enviar</Button>
      </div>
    </PopoverContent>
  </Popover>
}
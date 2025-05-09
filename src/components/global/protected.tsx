import { useAuth } from "@/hooks/use-auth";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

type Props = { children: ReactNode };

export function ProtectedRoute({ children }: Props) {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.signed) {
      navigate('/auth', { replace: true, viewTransition: true });
      return;
    }
  }, [auth, navigate]);

  return children;
}
import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Navigate } from "react-router"; 

type Props = { children: ReactNode };

export const ProtectedRoute = ({ children }: Props) => {
  const { signed } = useAuth();

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
import { AuthContextData, AuthContextUser, AuthPayloadInput, AuthPayloadOutput, AuthProviderProps } from "@/@types/auth";
import * as AuthService from "@/services/auth";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchUserData, setAuthHeaders } from "@/helpers/user";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => setAuthHeaders(), []);

  const getUser = useMemo(fetchUserData, []);

  const [user, setUser] = useState<AuthContextUser | null>(getUser);

  const handleAuth = useCallback(
    async (input: AuthPayloadInput): Promise<AuthPayloadOutput> => {
      const response = await AuthService.signIn(input);

      if (!response.token) {
        return { 
          error: { 
            email: response.error?.email as unknown as string, 
            password: response.error?.password as unknown as string 
          } 
        };
      }

      setUser({ email: input.email, token: response.token })
      Cookies.set("VITE_SESSION_TOKEN", response.token, { 
        expires: 30
      });
      setAuthHeaders();

      return { token: response.token };
    }, []);

  const currentContext = useMemo(() => ({
    signed: !!user,
    user,
    handleAuth
  }), [user, handleAuth]);

  return (
    <AuthContext.Provider value={currentContext}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
}
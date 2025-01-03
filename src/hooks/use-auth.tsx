import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as AuthService from "@/services/auth";
import { API } from "@/api";
import { AuthContextData, AuthContextUser, AuthProviderProps } from "@/types/auth";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  useEffect(() => {
    const token = sessionStorage.getItem('@app:token');

    if (token) {
      API.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.Authorization;
    }
  });

  const getUser = () => {
    const token = sessionStorage.getItem('@app:token');
    const user = sessionStorage.getItem('@app:user');

    if (user && typeof user !== 'undefined' && token) {
      return {
        email: user,
        token: token
      };
    }

    return null;
  }

  const [user, setUser] = useState<AuthContextUser | null>(getUser());

  async function handleAuth(payload: AuthService.AuthPayloadInput): Promise<AuthService.AuthPayloadOutput> {
    const response = await AuthService.signIn(payload);

    if (!response.token) return { 
      error: response.error 
    };

    setUser({
      email: payload.email,
      token: response.token
    })

    API.defaults.headers.Authorization = `Bearer ${response.token}`;

    return { 
      token: response.token
    };
  }

  const currentContext = useMemo(
    () => ({
      signed: !!user,
      user,
      handleAuth
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={currentContext}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextData => {
  return useContext(AuthContext);
};
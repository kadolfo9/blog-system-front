import { createContext, ReactNode, useState } from "react";
import * as AuthService from "@/services/auth";

interface AuthProviderProps {
    children?: ReactNode;
}

interface AuthContextUser {
    email?: string;
    token?: string;
}

interface AuthContextData {
    signed: boolean;
    user: AuthContextUser | null;
    handleAuth(payload: AuthService.AuthPayloadInput): Promise<AuthService.AuthPayloadOutput>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

        return { 
            token: response.token
        };
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            handleAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
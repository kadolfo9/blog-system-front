import * as AuthService from "@/services/auth";
import { ReactNode } from "react";

export interface AuthProviderProps {
    children?: ReactNode;
}

export interface AuthContextUser {
    email?: string;
    token?: string;
}

export interface AuthContextData {
    signed: boolean;
    user: AuthContextUser | null;
    handleAuth(payload: AuthService.AuthPayloadInput): Promise<AuthService.AuthPayloadOutput>;
}
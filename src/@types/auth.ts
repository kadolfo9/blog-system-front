import { JwtPayload } from 'jwt-decode';
import { ReactNode } from 'react';

export interface AuthSignUpInput {
  username: string;
  email: string;
  password: string;
}

export interface AuthPayloadInput {
  email: string;
  password: string;
}

export interface AuthPayloadOutput {
  token?: string;
  error?: AuthPayloadInput | null;
}

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface AuthContextUser {
  id?: string;
  email?: string;
  token?: string;
}

export type AuthContextJwtUser = JwtPayload & {
  email: string;
  username: string;
  id: string;
};

export interface AuthContextData {
  signed: boolean;
  user: AuthContextUser | null;
  handleAuth(payload: AuthPayloadInput): Promise<AuthPayloadOutput>;
  handleLogout(): void;
}

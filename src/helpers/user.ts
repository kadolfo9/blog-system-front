import { AuthContextJwtUser, AuthContextUser } from '@/@types/auth';
import { API } from '@/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const fetchUserData = (): AuthContextUser | null => {
  const token = Cookies.get('VITE_SESSION_TOKEN');

  if (token) {
    const decodedToken = jwtDecode(token) as AuthContextJwtUser;
    return {
      id: decodedToken.id,
      email: decodedToken.email,
      token: token,
    };
  }

  return null;
};

export const setAuthHeaders = () => {
  const token = Cookies.get('VITE_SESSION_TOKEN');

  if (token) {
    API.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.Authorization;
  }
};

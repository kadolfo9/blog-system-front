import { AuthPayloadInput, AuthPayloadOutput, AuthSignUpInput } from '@/@types/auth';
import { API } from '@/api';
import Cookies from 'js-cookie';

export function signIn(input: AuthPayloadInput): Promise<AuthPayloadOutput> {
  return new Promise((resolve, reject) => {
    API.post('/auth', input)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          API.defaults.headers.Authorization = `Bearer ${response.data.token}`;

          Cookies.set("VITE_COOKIE", response.data.token, {
            expires: 30
          });

          resolve({ token: response.data.token });
        }

        resolve({ token: response.data.token });
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status == 401) {
          reject({ email: response.data.message, password: [] });
          return;
        }
      });
  });
}

export function signUp(input: AuthSignUpInput): Promise<AuthPayloadOutput | void> {
  return new Promise((resolve, reject) => {
    API.post('/auth/signup', input)
      .then((response) => {
        if (response.status === 201) {
          resolve();
        }
      })
      .catch((error) => reject(error));
  });
}
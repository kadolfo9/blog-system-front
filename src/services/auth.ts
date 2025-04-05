import { AuthPayloadInput, AuthPayloadOutput, AuthSignUpInput } from '@/@types/auth';
import { API } from '@/api';

export function signIn(input: AuthPayloadInput): Promise<AuthPayloadOutput> {
  return new Promise((resolve) => {
    API.post('/auth', input)
      .then((response) => {
        if (response.status === 200 && response.data) {
          resolve({ token: response.data.token });
        }

        if (response.status == 401) {
          resolve({ error: { email: response.data?.message, password: '' } });
        }
      })
      .catch((error) => {
        const response = error.response;
        resolve({ error: { email: response.data?.message, password: '' } });
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

import { AuthPayloadInput, AuthPayloadOutput, AuthSignUpInput } from "@/@types/auth";
import { API } from "@/api";


export function signIn(payload: AuthPayloadInput): Promise<AuthPayloadOutput> {
  return new Promise((resolve, reject) => {
    API.post("/auth", payload)
      .then((response) => {
        API.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        sessionStorage.setItem("@app:user", payload.email);
        sessionStorage.setItem("@app:token", response.data.token);

        resolve({ token: response.data.token });
      })
      .catch((error) => {
        const response = error.response;

        if (response && response.status == 401) {
          reject({ email: response.data.message, password: [] });
          return;
        }
      });
  })
}

export function signUp(payload: AuthSignUpInput): Promise<AuthPayloadOutput | void> {
  return new Promise((resolve, reject) => {
    API.post("/auth/signup", payload)
      .then((response) => {
        if (response.status === 201) {
          resolve();
        }
      })
      .catch((error) => reject(error))
  });
}

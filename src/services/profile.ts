import { API } from "@/api";

export interface UserOutput {
    id: number;
    username: string;
    email: string;
}

export function getCurrentUser(): Promise<UserOutput> {
  const user = sessionStorage.getItem("@app:user");
  const token = sessionStorage.getItem("@app:token");

  return new Promise((resolve, reject) => {
    if (token && user) {
      API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.data) {
            resolve({
              id: response.data.id,
              email: response.data.email,
              username: response.data.username,
            });
          }
        })
        .catch((error) => reject(error));
    }
  });
}

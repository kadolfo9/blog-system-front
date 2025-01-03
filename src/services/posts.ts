import { API } from "@/api";

export interface CreatePostInput {
    title: string;
    content: string;
    images?: Array<unknown>;
}

export interface CreatePostOutput {
    statusCode: number;
    error?: string;
}

export function createPost(data: CreatePostInput): Promise<CreatePostOutput> {
  return new Promise((resolve, reject) => {
    API.post("/posts/create", data)
      .then((response) => {
        if (response.status) {
          resolve({
            statusCode: response.status
          });
        }
      })
      .catch((error) => reject(error))
  });
}

export interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface PostList {
    posts?: Array<Post>;
}

export function getAllPosts(userId: number): Promise<PostList> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/users/${userId}`)
      .then((response) => {
        if (response.data) {
          resolve({
            posts: response.data,
          });
        }
      })
      .catch((error) => reject(error))
  });
}

export function getPostByUserId(userId: string, postId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/users/${userId}/${postId}`)
      .then((response) => {
        resolve();
      })
      .catch((error) => reject(error));
  });
}

export function getPost(postId: string): Promise<Post> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/${postId}`)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch((error) => reject(error));
  });
}
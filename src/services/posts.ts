import { CreatePostInput, CreatePostOutput, PostData, PostList } from '@/@types/post';
import { API } from '@/api';

export function createPost(data: CreatePostInput): Promise<CreatePostOutput> {
  return new Promise((resolve, reject) => {
    API.post('/posts/create', data)
      .then((response) => {
        if (response.status) {
          resolve({
            statusCode: response.status,
          });
        }
      })
      .catch((error) => reject(error));
  });
}

export function getAllPostsByUserId(userId: string): Promise<PostList> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/users/${userId}`)
      .then((response) => {
        if (response.data) {
          resolve({
            posts: response.data,
          });
        }
      })
      .catch((error) => reject(error));
  });
}

export function getAllPosts(): Promise<PostList> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          resolve({
            posts: response.data,
          });
        }
      })
      .catch((error) => reject(error));
  });
}

export function getPostByUserId(userId: string, postId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/users/${userId}/${postId}`)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}

export function getPost(postId: string): Promise<PostData> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/${postId}`)
      .then((response) => {
        if (response.status === 200 && response.data) {
          resolve(response.data);
        }
      })
      .catch((error) => reject(error));
  });
}

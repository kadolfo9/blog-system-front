import { CreatePostInput, CreatePostOutput, EditPostInput, PostData, PostList, PostOutputCommon, UpdatePostOutput } from '@/@types/post';
import { API } from '@/api';

export function createPost(data: CreatePostInput): Promise<CreatePostOutput> {
  return new Promise((resolve, reject) => {
    API.post('/posts/create', data)
      .then((response) => {
        if (response.status) {
          resolve({
            statusCode: response.status,
            postId: response.data?.id,
          });
        }
      })
      .catch((error) => reject(error));
  });
}

export function getAllPostsByUserId(userId: string): Promise<PostData[]> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/users/${userId}`)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
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

export function updatePost(postId: string, input: EditPostInput): Promise<UpdatePostOutput> {
  return new Promise((resolve, reject) => {
    API.put(`/posts/edit/${postId}`, input)
      .then((response) => {
        if (response.status === 200) {
          resolve({
            statusCode: response.status,
          });
        }
      })
      .catch((error) => reject(error));
  });
}

export function deletePost(postId: string): Promise<PostOutputCommon> {
  return new Promise((resolve, reject) => {
    API.delete(`/posts/delete/${postId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve({ statusCode: response.status, });
        }
      }).catch((error) => reject(error));
  })
}
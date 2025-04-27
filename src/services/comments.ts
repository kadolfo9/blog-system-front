import { CreateCommentInput } from "@/@types/comments";
import { PostCommentData } from "@/@types/post";
import { API } from "@/api";

export function getAllComments(postId: string): Promise<PostCommentData[]> {
  return new Promise((resolve, reject) => {
    API.get(`/posts/comments/${postId}`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data as PostCommentData[]);
        }
      })
      .catch((error) => reject(error));
  });
}

export function createComment(input: CreateCommentInput): Promise<void> {
  return new Promise((resolve, reject) => {
    API.post(`/posts/comments/${input.postId}/create`, input)
      .then((response) => {
        console.log(response);
        if (response.status === 200 || response.status === 204) {
          resolve();
        }
      })
      .catch((error) => reject(error));
  });
}
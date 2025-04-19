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
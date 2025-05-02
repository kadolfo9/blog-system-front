export interface PostData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    username: string;
  };
}

export interface PostCommentData {
  content: string;
  // post: PostData;

  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    username: string;
  };
}

export interface PostList {
  posts?: PostData[];
}

export interface CreatePostInput {
  title: string;
  content: string;
  images?: Array<unknown>;
}

export interface CreatePostOutput {
  statusCode: number;
  error?: string;
}

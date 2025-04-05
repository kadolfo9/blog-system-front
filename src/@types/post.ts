export interface PostData {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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

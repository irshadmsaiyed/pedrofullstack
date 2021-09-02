import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($post: PostInput) {
    createPost(post: $post) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($comment: CommentInput) {
    createComment(comment: $comment) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: UserInput) {
    createUser(user: $user) {
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAllPosts {
    getAllPosts {
      id
      title
      postText
      username
    }
  }
`;

export const GET_POST = gql`
  query getPost($id:ID) {
    getPost(id:$id){
      id
      title
      postText
      username
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($postId:ID) {
    getComments(postId:$postId) {
      commentBody
    }
  }
`;

export const GET_USER = gql`
  query getUser($user:UserInput) {
    getUser(user:$user) {
      username
      password
    }
  }
`;
import { gql } from '@apollo/client';

export const SAY_HELLO = gql`
  query Query {
    Hello
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation Mutation(
    $phoneNumber: String!
    $password: String!
    $email: String!
    $name: String!
  ) {
    register(
      phoneNumber: $phoneNumber
      password: $password
      email: $email
      name: $name
    ) {
      message
      success
    }
  }
`;

export const SIGN_IN_USER_MUTATION = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      data {
        user {
          email
          id
          name
        }
        refreshToken
        accessToken
      }
      message
      success
    }
  }
`;

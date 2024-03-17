const { buildSchema } = require("graphql");

// Construct a schema
 const schema = buildSchema(`
  type User {
    _id: ID!
    username: String!
    email: String!
    followers: [User]
    following: [User]
  }

  type Post {
    _id: ID!
    content: String!
    author: User!
    createdAt : String
    likes: [User]!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input PostInput {
    content: String!
  }

  type Query {
    getUser: User
    getFollowingPosts(userId: ID!): [Post]
    getPosts: [Post!]!
    getOwnPosts: [Post!]!
  }
  
  type Mutation {
    register(input: UserInput!): String
    login(email: String!, password: String!): String
    createPost(input: PostInput!): String
    followUser(userId: ID!): String
    unfollowUser(userId: ID!, followerId: ID!): String
    likePost(postId: ID!): String
    unlikePost(postId: ID!): String

  }
`);


module.exports = {schema}
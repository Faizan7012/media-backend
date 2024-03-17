const {userModel} = require('../models/user')
const {postModel} = require('../models/post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;
 const root = {
    getUser: async ({} , context) => {
      return await userModel.findById(context.userId);
    },
    getOwnPosts: async ({} , context) => {
      if (!context.userId) {
        throw new Error('Authentication required.');
      }
      return await postModel.find({ author:context.userId });
    },
    getPosts: async () => {
      return await postModel.find().populate('author').populate('likes');
    },
    register: async ({ input }) => {
      const { username, email, password } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ username, email, password: hashedPassword });
      await user.save();
      return 'User registered successfully.';
    },
    login: async ({ email, password }) => {
      const user = await userModel.findOne({ email });
      if (!user) {
        throw new Error('User not found.');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid password.');
      }
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7days' });
      return token;
    },
    createPost: async ({ input }, context) => {
      if (!context.userId) {
        throw new Error('Authentication required.');
      }
      const { content } = input;
      const post = new postModel({ content, author: context.userId });
      await post.save();
      return 'Post created successfully.';
    },

    getFollowingPosts: async ({ userId }) => {
      const user = await userModel.findById(userId);
      const followingIds = [...user.following, userId];
      return await postModel.find({ author: { $in: followingIds } });
    },
    followUser: async ({ userId }, context) => {
      if (!context.userId) {
        throw new Error('Authentication required.');
      }
      const userToFollow = await userModel.findById(userId);
      if (!userToFollow) {
        throw new Error('User not found.');
      }
      if (userToFollow._id.equals(context.userId)) {
        throw new Error('Cannot follow yourself.');
      }
      const currentUser = await userModel.findById(context.userId);
      if (currentUser.following.includes(userToFollow._id)) {
        throw new Error('Already following this user.');
      }
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
      return 'User followed successfully.';
    },

    unfollowUser: async ({ userId, followerId }) => {
      const user = await userModel.findById(userId);
      if (user.followers.includes(followerId)) {
        user.followers = user.followers.filter(id => id !== followerId);
        await user.save();
        return 'User unfollowed successfully';
      }
      return 'User not followed';
    },
    likePost: async ({ postId }, context) => {
      if (!context.userId) throw new Error('Authentication failed');
      await postModel.findByIdAndUpdate(postId, { $addToSet: { likes: context.userId } });
      return 'Post liked successfully';
    },
    unlikePost: async ({ postId }, context) => {
      if (!context.userId) throw new Error('Authentication failed');
      await postModel.findByIdAndUpdate(postId, { $pull: { likes: context.userId } });
      return 'Post unliked successfully';
    },
  };
  

  module.exports = {root}
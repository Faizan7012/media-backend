const { default: mongoose } = require("mongoose");

// User Schema
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: String, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

  });
   const postModel = mongoose.model('post', postSchema);

   module.exports = {postModel}
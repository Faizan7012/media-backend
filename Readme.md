## instructions of how to use this api 


<h3>
Usage <br />
To use the Media App API, follow these steps:<br />

Install Node.js and npm if not already installed.<br />
Clone the repository: git clone       <br />
Install dependencies: npm install<br />
Start the server: npm start<br />
Use Postman or any other HTTP client to make requests to the provided endpoints.
</h3>


## Base url 
<p>base url =  https://jealous-fawn-loafers.cyclic.app </p>
## headers 
<p>include a header name token and pass token in all requests except login and signup</p>
<p>eg : headers : {token : userToken}</p>

## Endpoints

### 1. Register User

- **Endpoint**: `POST /graphql`<br />
- **Body**: <br />
json <br />
  {
    "query": "mutation { register(input: { username: \"yourname\", email: \"example@gmail.com\", password: \"password\" }) }"
  }<br />
Description: Registers a new user with the provided username, email, and password.
## 2. Login User
Endpoint: POST /graphql<br />
Body:<br />
json<br />
{
  "query": "mutation { login(email: \"user@example.com\", password: \"password123\") }"
}<br />
Description: Logs in an existing user with the provided email and password. Returns a JWT token for authentication.
## 3. Create Post<br />
Endpoint: POST /graphql<br />
Body:<br />
json<br />
{
  "query": "mutation { createPost(input: { content: \"This is a new post.\" }) }"
}<br />
Description: Creates a new post with the provided content.
## 4. Like Post<br />
Endpoint: POST /graphql<br />
Body:<br />
json :<br />
{
  "query": "mutation { likePost(postId: \"post_id_here\") }"
}<br />
Description: Likes a post with the given post ID.
## 5. Unlike Post<br />
Endpoint: POST /graphql<br />
Body:<br />
json<br />
{
  "query": "mutation { unlikePost(postId: \"post_id_here\") }"
}<br />
Description: Unlikes a post with the given post ID.
## 6. Follow User
Endpoint: POST /graphql<br />
Body:<br />
json<br />
{
  "query": "mutation { followUser(userId: \"user_id_here\") }"
}<br />
Description: Follows a user with the given user ID.
## 7. Unfollow User<br />
Endpoint: POST /graphql<br />
Body:<br />
json<br />
{
  "query": "mutation { unfollowUser(userId: \"user_id_here\") }"
}<br />
Description: Unfollows a user with the given user ID.
## 8. Get User Posts<br />
Endpoint: GET /graphql?query={getOwnPosts { _id content createdAt } }<br />
Description: Retrieves all posts by a specific user.
## 9. Get All Posts<br />
Endpoint: GET /graphql?query={getPosts { _id content createdAt } }<br />
Description: Retrieves all posts with post data, username, and createdAt time.


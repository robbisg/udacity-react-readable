const ADD_POST = "ADD_POST"
const addPost = (title, body, author, category) => (
  return {
    type:ADD_POST,
    title,
    body,
    author,
    category
  }
)

const DELETE_POST = "DELETE_POST"
const deletePost = (postId) => (
  return {
    type: DELETE_POST,
    postId,
    deleted: true
  }
)

const UPDATE_POST = "UPDATE_POST"
const updatePost = (postId, title, body) => (
  return {
    type:UPDATE_POST,
    postId,
    title,
    body
  }
)

const READ_POSTS = "READ_POSTS"
const readPOSTs = () => (
  return {
    type: READ_POSTS,
  }
)

const READ_POST = "READ_POST"
const readPost = (postId) => (
  return {
    type: READ_POST,
    postId
  }
)

const UPVOTE_POST = "UPVOTE_POST"
const upVotePost = (postId) => (
  return {
    type: UPVOTE_POST,
    postId
  }
)

const DOWNVOTE_POST = "DOWNVOTE_POST"
const downVotePost = (postId) => (
  return {
    type: DOWNVOTE_POST,
    postId
  }
)

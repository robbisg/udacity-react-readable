const ADD_COMMENT = "ADD_COMMENT"
const addComment = (body, author, postId) => (
  return {
    type:ADD_COMMENT,
    body,
    user,
    postId
  }
)

const DELETE_COMMENT = "DELETE_COMMENT"
const deleteComment = (commentId) => (
  return {
    type: DELETE_COMMENT,
    commentId,
    deleted: true
  }
)

const UPDATE_COMMENT = "UPDATE_COMMENT"
const updateComment = (commentId, body) => (
  return {
    type:UPDATE_COMMENT,
    commentId,
    body
  }
)

const READ_COMMENTS = "READ_COMMENTS"
const readComments = (postId) => (
  return {
    type: READ_COMMENTS,
    postId
  }
)

const UPVOTE_COMMENT = "UPVOTE_COMMENT"
const upVoteComment = (commentId) => (
  return {
    type: UPVOTE_COMMENT,
    commentId
  }
)

const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"
const downVoteComment = (commentId) => (
  return {
    type: DOWNVOTE_COMMENT,
    commentId
  }
)

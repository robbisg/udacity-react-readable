import * as ReadableAPI from '../utils/api'
import { serverError, isLoading } from './posts'

export const ADD_COMMENT = "ADD_COMMENT"
export function addComment(body, owner, parentId) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.addComment(body, owner, parentId)
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then(() =>
        dispatch(
          {
            type:ADD_COMMENT,
            body,
            owner,
            parentId
          }

        )
      )
  }
}


export const DELETE_COMMENT = "DELETE_COMMENT"
export function deleteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.deleteComment(commentId)
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then(() =>
        dispatch(
          {
            type: DELETE_COMMENT,
            commentId: commentId
          }

        )
      )
  }
}


export const UPDATE_COMMENT = "UPDATE_COMMENT"
export function updateComment(commentId, body) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.editComment(commentId, body)
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then(() =>
        dispatch(
          {
            type: DELETE_COMMENT,
            commentId,
            body
          }

        )
      )
  }
}


export const FETCH_COMMENTS = "FETCH_COMMENTS"
export function fetchComments(postId) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.getPostComments(postId)
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then((data) =>
        dispatch(
          {
            type: FETCH_COMMENTS,
            data,
          }

        )
      )
  }
}


export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export function upVoteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.voteComment(commentId, "upVote")
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then(() =>
        dispatch(
          {
            type: UPVOTE_COMMENT,
            commentId
          }

        )
      )
  }
}

export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"
export function downVoteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading())

    return ReadableAPI.voteComment(commentId, "downVote")
      .then(
        response => response.json(),
        error => dispatch(serverError())
      )
      .then(() =>
        dispatch(
          {
            type: DOWNVOTE_COMMENT,
            commentId
          }

        )
      )
  }
}

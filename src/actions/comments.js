import * as ReadableAPI from '../utils/api'
import { serverError, isLoading } from './posts'

export const ADD_COMMENT = "ADD_COMMENT"
export function addComment(body, author, parentId) {


  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.addComment(body, author, parentId)
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) => {
        dispatch(
          {
            type:ADD_COMMENT,
            ...data
          }

        )
        }
      )
  }
}


export const DELETE_COMMENT = "DELETE_COMMENT"
export function deleteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.deleteComment(commentId)
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then(() =>{
        dispatch(
          {
            type: DELETE_COMMENT,
            commentId: commentId
          }

        )}
      )
  }
}


export const UPDATE_COMMENT = "UPDATE_COMMENT"
export function updateComment(commentId, body) {

  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.editComment(commentId, body)
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then(() =>{
        dispatch(
          {
            type: DELETE_COMMENT,
            commentId,
            body
          }

        )}
      )
  }
}


export const FETCH_COMMENTS = "FETCH_COMMENTS"
export function fetchComments(postId) {

  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.getPostComments(postId)
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) => {
        dispatch(
          {
            type: FETCH_COMMENTS,
            data,
          }

        )}
      )
  }
}


export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export function upVoteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.voteComment(commentId, "upVote")
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then(() => {
        dispatch(
          {
            type: UPVOTE_COMMENT,
            commentId
          }

        )}
      )
  }
}

export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"
export function downVoteComment(commentId) {

  return function (dispatch) {

    dispatch(isLoading(true))

    return ReadableAPI.voteComment(commentId, "downVote")
      .then(
        (response) => {
          dispatch(isLoading(false))
          response.json()
          return response
        },
        error => dispatch(serverError())
      )
      .then(() =>{
        dispatch(
          {
            type: DOWNVOTE_COMMENT,
            commentId
          }

        )}
      )
  }
}

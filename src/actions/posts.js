import * as ReadableAPI from '../utils/api'

export const POST_LOADING = "POST_LOADING"
export const postLoading = (bool) => (
   {
    type: POST_LOADING,
    isLoading: bool
  }
)

export const SERVER_ERROR = "SERVER_ERROR"
export const serverError = (bool) => (
   {
    type: SERVER_ERROR,
    serverError: bool
  }
)


export const ADD_POST = "ADD_POST"
export function addPost(title, body, owner, category) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.addPost(title, body, owner, category)
      .then(
        (response) => {
          dispatch(postLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) => {
        dispatch(
          {
            type:ADD_POST,
            data

          }

        )
      }
      )
  }
}




export const DELETE_POST = "DELETE_POST"
export function deletePost(postId) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.deletePost(postId)
      .then(
        (response) => {
          dispatch(postLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then(() => {
        dispatch(
          {
            type: DELETE_POST,
            postId: postId
          }

        )}
      )
  }
}


export const UPDATE_POST = "UPDATE_POST"
export function updatePost(postId, title, body) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.editPost(postId, title, body)
      .then(
        (response) => {
          dispatch(postLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) =>{
        dispatch(
          {
            type: UPDATE_POST,
            data
          }

        )}
      )
  }
}

export const FETCH_POSTS = "FETCH_POSTS"
export function fetchPosts() {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.getPosts()
      .then(
        (response) => {
          dispatch(postLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) =>{
        dispatch(
          {
            type: FETCH_POSTS,
            data
          }

        )}
      )
  }
}


export const READ_POST = "READ_POST"
export function readPost(postId) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.getPostById(postId)
      .then(
        (response) => {
          dispatch(postLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) => {
        dispatch(
          {
            type: READ_POST,
            data
          }

        )}
      )
  }
}

export const UPVOTE_POST = "UPVOTE_POST"
export function upVotePost(postId) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.votePost(postId, "upVote")
      .then(
        (response) => {
          dispatch(postLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) => {
        dispatch(
          {
            type: UPVOTE_POST,
            id: postId
          }

          )
        }
      )
  }
}


export const DOWNVOTE_POST = "DOWNVOTE_POST"
export function downVotePost(postId) {

  return function (dispatch) {

    dispatch(postLoading(true))

    return ReadableAPI.votePost(postId, "downVote")
      .then(
        (response) => {
          dispatch(postLoading(false))
          response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) =>{
        dispatch(
          {
            type: DOWNVOTE_POST,
            id: postId
          }

        )}
      )
  }
}

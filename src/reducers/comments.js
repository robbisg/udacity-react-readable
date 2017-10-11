import { ADD_COMMENT, FETCH_COMMENTS, READ_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../actions/comments'
import { UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/comments'
import { arrayToObject } from '../utils/converter'

export function comments(state = {comments:[]}, action) {

  switch (action.type) {

    case ADD_COMMENT:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: {
          ...state.comments,
          [action.data.parentId]:
          {
            ...action.data
          }
        }

      })


    case DELETE_COMMENT:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: {
          ...state.comments,
          [action.commentId]:
          {
            ...state.comments[action.commentId],
            deleted: true
          }
        }

      })

    case UPDATE_COMMENT:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: {
          ...state.comments,
          [action.commentId]:
          {
            ...state.comments[action.commentsId],
            body: action.body
          }
        }

      })

    case FETCH_COMMENTS:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: arrayToObject(action.data)

      })


    case UPVOTE_COMMENT:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: {
          ...state.comments,
          [action.commentId]:
          {
            ...state.comments[action.commentId],
            voteScore: state.comments[action.commentId].voteScore + 1,
          }
        }
      })

    case DOWNVOTE_COMMENT:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        comments: {
          ...state.comments,
          [action.commentId]:
          {
            ...state.comments[action.commentId],
            voteScore: state.comments[action.commentId].voteScore - 1,
          }
        }
      })

    default:
      return state
  }
}

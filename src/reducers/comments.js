import { ADD_COMMENT, FETCH_COMMENTS, READ_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../actions/comments'
import { UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/comments'
import { arrayToObject } from '../utils/converter'

export function comments(state={}, action) {

  console.log(action)

  switch (action.type) {

    case ADD_COMMENT:
      return Object.assign({}, state, {
        ...state,
        [action.id]:
        {
          ...action
        }

      })


    case DELETE_COMMENT:
      return Object.assign({}, state, {
        ...state,
        [action.commentId]:
          {
            ...state[action.commentId],
            deleted: true
          }


      })

    case UPDATE_COMMENT:
      return Object.assign({}, state, {
        ...state,
          [action.commentId]:
          {
            ...state[action.commentsId],
            body: action.body
          }


      })

    case FETCH_COMMENTS:
      return Object.assign({}, state, arrayToObject(action.data))


    case UPVOTE_COMMENT:
      return Object.assign({}, state, {
        ...state,
        [action.commentId]:
          {
            ...state[action.commentId],
            voteScore: state[action.commentId].voteScore + 1,
          }

      })

    case DOWNVOTE_COMMENT:
      return Object.assign({}, state, {
        ...state,
        [action.commentId]:
          {
            ...state[action.commentId],
            voteScore: state[action.commentId].voteScore - 1,
          }
        
      })

    default:
      return state
  }
}

import { ADD_COMMENT, FETCH_COMMENTS, READ_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from '../actions/comments'
import { UPVOTE_COMMENT, DOWNVOTE_COMMENT, COMMENT_LOADING } from '../actions/comments'
import { arrayToObject } from '../utils/converter'


export function commentLoading(state=false, action) {

  switch (action.type) {
    case COMMENT_LOADING:
      return action.isLoading

    default:
      return state

  }

}


export function comments(state={}, action) {

  //console.log(action)

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
        [action.id]:
          {
            ...state[action.id],
            deleted: true
          }


      })

    case UPDATE_COMMENT:
      return Object.assign({}, state, {
        ...state,
          [action.data.id]:
          {
            ...action.data
          }


      })

    case FETCH_COMMENTS:
      return arrayToObject(action.data)


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

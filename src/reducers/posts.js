import { ADD_POST, FETCH_POSTS, READ_POST, DELETE_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST } from '../actions/posts'
import { IS_LOADING, SERVER_ERROR} from '../actions/posts'
import { combineReducers } from 'redux'
import { comments } from './comments'
import { arrayToObject } from '../utils/converter'

export function isLoading(state=false, action) {

  switch (action.type) {
    case IS_LOADING:
      return action.isLoading

    default:
      return state

  }

}


export function posts(state={}, action) {

  switch (action.type) {


    case ADD_POST:
      return Object.assign({}, state, {
        ...state,
          [action.data.id]:
          {
            ...action.data
          }
      })

    case DELETE_POST:
      return Object.assign({}, state, {
        ...state,
          [action.postId]:
          {
            ...state[action.postId],
            deleted: true
          }


      })

    case UPDATE_POST:
      return Object.assign({}, state, {
        ...state,
        [action.postId]:
          {
            ...state[action.postId],
            title: action.title,
            body: action.body
          }

      })

    case FETCH_POSTS:
      return Object.assign({}, state, arrayToObject(action.data))


    case UPVOTE_POST:
      return Object.assign({}, state, {
        ...state,
        [action.id]:
          {
            ...state[action.id],
            voteScore: state[action.id].voteScore+1,
          }


      })

    case DOWNVOTE_POST:
      return Object.assign({}, state, {
        ...state,
        [action.id]:
          {
            ...state[action.id],
            voteScore: state[action.id].voteScore-1,
          }

      })


    default:
      return state
  }
}


export const reducer = combineReducers({
  isLoading,
  posts,
  comments
})

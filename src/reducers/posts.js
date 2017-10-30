import { ADD_POST, FETCH_POSTS, READ_POST, DELETE_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST } from '../actions/posts'
import { POST_LOADING, SERVER_ERROR} from '../actions/posts'
import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments'
import { combineReducers } from 'redux'
import { comments, commentLoading } from './comments'
import { categories, categoryLoading } from './categories'
import { arrayToObject } from '../utils/converter'

export function postLoading(state=false, action) {

  switch (action.type) {
    case POST_LOADING:
      return action.isLoading

    default:
      return state

  }

}


export function posts(state={}, action) {
  //console.log(action)
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
        [action.data.id]:
          {
            ...action.data
          }

      })

    case FETCH_POSTS:
      return arrayToObject(action.data)


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

    case READ_POST:
      return arrayToObject([action.data])


    case ADD_COMMENT:
      return Object.assign({}, state, {
        ...state,
        [action.parentId]:
          {
            ...state[action.parentId],
            commentCount: state[action.parentId].commentCount + 1,
          }

      })

      case DELETE_COMMENT:
        return Object.assign({}, state, {
          ...state,
          [action.parentId]:
            {
              ...state[action.parentId],
              commentCount: state[action.parentId].commentCount - 1,
            }

        })

    default:
      return state
  }
}


export const reducer = combineReducers({
  postLoading,
  posts,
  commentLoading,
  comments,
  categoryLoading,
  categories
})

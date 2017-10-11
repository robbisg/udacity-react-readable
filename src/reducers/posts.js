import { ADD_POST, FETCH_POSTS, READ_POST, DELETE_POST, UPDATE_POST, UPVOTE_POST, DOWNVOTE_POST } from '../actions/posts'
import { IS_LOADING, SERVER_ERROR} from '../actions/posts'
import { combineReducers } from 'redux'
import { comments } from './comments'
import { arrayToObject } from '../utils/converter'




export function loading(state = {}, action){
  switch (action.type){
    case IS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        serverError: false,
        ...state
      })

    case SERVER_ERROR:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: true,
        ...state
      })

    default:
      return state
  }
}


export function posts(state = {posts:[], currentPost:{}}, action) {

  switch (action.type) {


    case ADD_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: {
          ...state.posts,
          [action.data.id]:
          {
            ...action.data
          }
        }

      })

    case DELETE_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: {
          ...state.posts,
          [action.postId]:
          {
            ...state.posts[action.postId],
            deleted: true
          }
        }

      })

    case UPDATE_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: {
          ...state.posts,
          [action.postId]:
          {
            ...state.posts[action.postId],
            title: action.title,
            body: action.body
          }
        }

      })

    case FETCH_POSTS:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: arrayToObject(action.data)

      })


    case UPVOTE_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: {
          ...state.posts,
          [action.postId]:
          {
            ...state.posts[action.postId],
            voteScore: state.posts[action.postId].voteScore + 1,
          }
        }

      })

    case DOWNVOTE_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        posts: {
          ...state.posts,
          [action.postId]:
          {
            ...state.posts[action.postId],
            voteScore: state.posts[action.postId].voteScore - 1,
          }
        }
      })

    case READ_POST:
      return Object.assign({}, state, {
        isLoading: false,
        serverError: false,
        ...state,
        currentPost: {
          ...action.data
        }
      })


    default:
      return state
  }
}


export const reducer = combineReducers({
  loading,
  posts,
  comments
})

import { CATEGORY_LOADING, FETCH_CATEGORIES} from '../actions/categories'

export function categoryLoading(state=false, action) {

  switch (action.type) {
    case CATEGORY_LOADING:
      return action.isLoading

    default:
      return state

  }

}

export function categories(state=[], action) {

  switch (action.type) {

    case FETCH_CATEGORIES:
      return action.data.categories


    default:
      return state
  }
}

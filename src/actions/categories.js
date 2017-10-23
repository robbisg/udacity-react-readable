import * as ReadableAPI from '../utils/api'
import { serverError } from './posts'


export const CATEGORY_LOADING = "CATEGORY_LOADING"
export const categoryLoading = (bool) => (
   {
    type: CATEGORY_LOADING,
    isLoading: bool
  }
)

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"
export function fetchCategories() {

  return function (dispatch) {

    dispatch(categoryLoading(true))

    return ReadableAPI.getCategories()
      .then(
        (response) => {
          dispatch(categoryLoading(false))
          return response.json()
        },
        error => dispatch(serverError())
      )
      .then((data) =>{
        dispatch(
          {
            type: FETCH_CATEGORIES,
            data
          }

        )}
      )
  }
}

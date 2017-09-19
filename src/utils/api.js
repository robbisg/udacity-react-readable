
const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/*
GET /categories
USAGE:
Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.
*/

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)


/*
GET /:category/posts
USAGE:
Get all of the posts for a particular category
*/

export const getCategoryPosts = (categoryId) =>
  fetch(`${api}/${categoryId}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

/*
GET /posts
USAGE:
Get all of the posts. Useful for the main page when no category is selected.
*/

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

/*
POST /posts
USAGE:
Add a new post

PARAMS:
id - UUID should be fine, but any unique id will work
timestamp - timestamp in whatever format you like, you can use Date.now() if you like
title - String
body - String
owner - String
category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
*/
export const addPost = (title, body, owner, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { id: Math.random().toString(36).substr(-8),
        timestamp: Date.now(),
        title,
        body,
        owner,
        category
      })
  }).then(res => res.json())
    .then(data => data)

/*
GET /posts/:id
USAGE:
Get the details of a single post
*/
export const getPostById = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)
/*
POST /posts/:id
USAGE:
Used for voting on a post

PARAMS:
option - String: Either "upVote" or "downVote"

PUT /posts/:id
USAGE:
Edit the details of an existing post

PARAMS:
title - String
body - String

DELETE /posts/:id
USAGE:
Sets the deleted flag for a post to 'true'.
Sets the parentDeleted flag for all child comments to 'true'.

GET /posts/:id/comments
USAGE:
Get all the comments for a single post

POST /comments
USAGE:
Add a comment to a post

PARAMS:
id: Any unique ID. As with posts, UUID is probably the best here.
timestamp: timestamp. Get this however you want.
body: String
owner: String
parentId: Should match a post id in the database.

GET /comments/:id
USAGE:
Get the details for a single comment

POST /comments/:id
USAGE:
Used for voting on a comment.

PUT /comments/:id
USAGE:
Edit the details of an existing comment

PARAMS:
timestamp: timestamp. Get this however you want.
body: String

DELETE /comments/:id
USAGE:
Sets a comment's deleted flag to 'true'

*/



export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  }).then(res => res.json())
    .then(data => data.books)

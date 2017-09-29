
const api = "http://localhost:3001"


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
*/

export const votePost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        option
      })
  }).then(res => res.json())
    .then(data => data)


/*
PUT /posts/:id
USAGE:
Edit the details of an existing post

PARAMS:
title - String
body - String
*/

export const editPost = (postId, title, body) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        title,
        body
      })
  }).then(res => res.json())

/*
DELETE /posts/:id
USAGE:
Sets the deleted flag for a post to 'true'.
Sets the parentDeleted flag for all child comments to 'true'.
*/

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())


/*
GET /posts/:id/comments
USAGE:
Get all the comments for a single post
*/

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.comments)


/*
POST /comments
USAGE:
Add a comment to a post

PARAMS:
id: Any unique ID. As with posts, UUID is probably the best here.
timestamp: timestamp. Get this however you want.
body: String
owner: String
parentId: Should match a post id in the database.
*/

export const addComment = (body, owner, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      { id: Math.random().toString(36).substr(-8),
        timestamp: Date.now(),
        body,
        owner,
        parentId
      })
  }).then(res => res.json())
    .then(data => data)

/*
GET /comments/:id
USAGE:
Get the details for a single comment
*/

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)

/*
POST /comments/:id
USAGE:
Used for voting on a comment.
*/

export const voteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => data)

/*
PUT /comments/:id
USAGE:
Edit the details of an existing comment

PARAMS:
timestamp: timestamp. Get this however you want.
body: String
*/

export const editComment = (commentId, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        timestamp: Date.now(),
        body,
      })
  }).then(res => res.json())

/*
DELETE /comments/:id
USAGE:
Sets a comment's deleted flag to 'true'

*/
export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        deleted: 'true',
      })
  }).then(res => res.json())

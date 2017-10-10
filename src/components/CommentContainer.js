import React, { Component } from 'react'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CommentList, AddComment } from './Comment'
import { fetchComments, addComment } from '../actions/comments'


class CommentContainer extends Component {

  componentWillMount() {
    console.log(this.props)
    this.props.fetchComments(this.props.postId)

  }

  addComment

  render() {
    return(
      <div>
        <CommentList comments={this.props.comments}/>
        <AddComment add={this.props.addComment}/>
      </div>
    )
  }

}


function mapStateToProps ({loading, posts, comments}) {
  console.log(comments)
  return {
    comments: comments.comments,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    addComment: (id) => (data) => dispatch(addComment(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentContainer))

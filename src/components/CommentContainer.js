import React, { Component } from 'react'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CommentList, AddComment } from './Comment'
import { fetchComments, addComment, upVoteComment, downVoteComment } from '../actions/comments'


class CommentContainer extends Component {

  componentWillMount() {
    console.log(this.props)
    this.props.fetchComments(this.props.postId)

  }

  addComment

  render() {
    return(
      <div>
        <CommentList comments={this.props.comments} upVote={this.props.upVoteComment} downVote={this.props.downVoteComment}/>
        <AddComment addComment={this.props.addComment} id={this.props.postId}/>
      </div>
    )
  }

}


function mapStateToProps ({loading, posts, comments}) {
  console.log(comments)
  return {
    comments: Object.keys(comments.comments).map((k) => comments.comments[k]),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    upVoteComment: (id) => dispatch(upVoteComment(id)),
    downVoteComment: (id) => dispatch(downVoteComment(id)),
    addComment: (body, author, id) => dispatch(addComment(body, author, id))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentContainer))

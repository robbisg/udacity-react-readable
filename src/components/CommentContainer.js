import React, { Component } from 'react'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CommentList, AddComment } from './Comment'
import { fetchComments,
  addComment,
  upVoteComment,
  deleteComment,
  downVoteComment } from '../actions/comments'


class CommentContainer extends Component {

  componentDidMount() {
    console.log(this.props)
    this.props.fetchComments(this.props.postId)

  }


  render() {
    return(
      <div>
        <CommentList comments={this.props.comments}
          upVote={this.props.upVoteComment}
          downVote={this.props.downVoteComment}
          deleteComment={this.props.deleteComment}
        />
        <AddComment addComment={this.props.addComment} id={this.props.postId}/>
      </div>
    )
  }

}


function mapStateToProps ({loading, posts, comments}) {
  console.log(comments)
  return {
    comments: Object.keys(comments).map((k) => comments[k]),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    upVoteComment: (id) => dispatch(upVoteComment(id)),
    downVoteComment: (id) => dispatch(downVoteComment(id)),
    addComment: (body, author, id) => dispatch(addComment(body, author, id)),
    deleteComment: (id) => dispatch(deleteComment(id))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentContainer))

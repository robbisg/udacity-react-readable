import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CommentList, AddComment } from './Comment'
import { Row, Col } from 'react-flexbox-grid';
import { fetchComments,
  addComment,
  upVoteComment,
  deleteComment,
  updateComment,
  downVoteComment } from '../actions/comments'


class CommentContainer extends Component {

  componentWillMount() {
    this.props.fetchComments(this.props.postId)
  }


  render() {
    return(
      <Row>
        <Col xs={12}>
          <CommentList comments={this.props.comments}
            upVote={this.props.upVoteComment}
            downVote={this.props.downVoteComment}
            deleteComment={this.props.deleteComment}
            updateComment={this.props.updateComment}
          />
          <AddComment addComment={this.props.addComment}
            id={this.props.postId}/>
        </Col>
      </Row>
    )
  }

}


function mapStateToProps (state) {
  return {
    comments: Object.keys(state.comments).map((k) => state.comments[k]).sort(function(a,b){return b.voteScore-a.voteScore}),
    commentLoading: state.commentLoading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (id) => dispatch(fetchComments(id)),
    upVoteComment: (id) => dispatch(upVoteComment(id)),
    downVoteComment: (id) => dispatch(downVoteComment(id)),
    addComment: (body, author, id) => dispatch(addComment(body, author, id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    updateComment: (id, body) => dispatch(updateComment(id, body))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentContainer))

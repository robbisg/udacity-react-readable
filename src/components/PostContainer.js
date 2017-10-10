import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import CommentContainer from './CommentContainer'
import { PostPage, PostActions } from './Post'
import { readPost, downVotePost, upVotePost } from '../actions/posts'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class PostContainer extends Component{

  state = {
    currentPost: {}
  }

  componentWillMount() {
    console.log(this.props.currentPost)
    this.props.readPost(this.props.postId)
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <PostActions />
          <PostPage post={this.props.currentPost} upVote={this.props.upVotePost} downVote={this.props.downVotePost}/>
          <CommentContainer postId={this.props.postId} />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps ({loading, posts, comments}) {
  console.log(posts)
  return {
    currentPost: posts.currentPost,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    readPost: (id) => dispatch(readPost(id)),
    upVotePost: (id) => dispatch(upVotePost(id)),
    downVotePost: (id) => dispatch(downVotePost(id))

  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(PostContainer))

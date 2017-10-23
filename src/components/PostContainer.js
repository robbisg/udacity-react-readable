import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import CommentContainer from './CommentContainer'
import { PostPage, PostActions } from './Post'
import { fetchPosts, downVotePost, upVotePost } from '../actions/posts'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress';

class PostContainer extends Component{


  componentWillMount() {

    this.props.fetchPosts()
    console.log(this.props)
  }


  render() {
    console.log(this.props)

    const currentPost = this.props.posts.filter((post) => post.id === this.props.postId)[0]
    return (

      <Row>
        <Col xs={12}>
          <PostActions />
          <PostPage post={currentPost} upVote={this.props.upVotePost} downVote={this.props.downVotePost}/>
          <CommentContainer postId={this.props.postId} />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps ({postLoading, posts, commentLoading, comments}) {
  return {
    posts: Object.keys(posts).map((k) => posts[k]),
    postLoading: postLoading
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    upVotePost: (id) => dispatch(upVotePost(id)),
    downVotePost: (id) => dispatch(downVotePost(id))

  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(PostContainer))

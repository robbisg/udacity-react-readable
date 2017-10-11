import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import CommentContainer from './CommentContainer'
import { PostPage, PostActions } from './Post'
import { fetchPosts, downVotePost, upVotePost } from '../actions/posts'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class PostContainer extends Component{


  componentWillMount() {

    this.props.fetchPosts()
    console.log(this.props)


  }


  render() {
    const currentPost = this.props.posts[this.props.postId]
    console.log(currentPost)

    if (this.props.isLoading) {
        return <p>Loading…</p>;
    }

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

function mapStateToProps ({loading, posts, comments}) {
  console.log(posts)
  return {
    posts: posts.posts,
    isLoading: posts.isLoading
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

import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import { PostPage, PostActions, DeletePostModal } from './Post'
import { readPost,
         addPost,
         fetchPosts,
         downVotePost,
         upVotePost,
         deletePost,
         updatePost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PostContainer extends Component{


  componentWillMount() {
    console.log(this.props.postId)
    this.props.fetchPosts()
    this.props.fetchCategories()
    console.log(this.props)
  }


  addPost = (title, body, owner, category) => {
    this.props.addPost(title, body, owner, category)
    this.props.history.push("/")
  }

  render() {
    console.log(this.props)

    const posts = this.props.posts.filter((post) => post.id === this.props.postId)

    if (posts.length === 0){
      return(
        <DeletePostModal history={this.props.history} isVisible={true}/>
          )
    }


    return (

      <Row>
        <Col xs={12}>
          <Row style={{margin:"15px"}}>
            <Col xs={12}>
              <PostActions
                addPost={this.addPost}
                categories={this.props.categories}
              />
            </Col>
          </Row>
          {posts.map((post) =>
            <PostPage
              post={post}
              upVote={this.props.upVotePost}
              downVote={this.props.downVotePost}
              edit={this.props.updatePost}
              delete={this.props.deletePost}
              history={this.props.history}
            />)}

        </Col>
      </Row>
    )
  }
}

function mapStateToProps (state) {
  return {
    posts: Object.keys(state.posts).map((k) => state.posts[k]).filter((p) => !p.deleted),
    postLoading: state.postLoading,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    readPost: (id) => dispatch(readPost(id)),
    fetchPosts: () => dispatch(fetchPosts()),
    addPost: (title, body, owner, category) => dispatch(addPost(title, body, owner, category)),
    upVotePost: (id) => dispatch(upVotePost(id)),
    downVotePost: (id) => dispatch(downVotePost(id)),
    updatePost: (id, title, body) => dispatch(updatePost(id, title, body)),
    deletePost: (id) => dispatch(deletePost(id)),
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(PostContainer))

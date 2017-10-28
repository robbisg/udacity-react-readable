import React, { Component } from 'react'
import { Row, Col } from 'react-flexbox-grid';
import { PostPage, PostActions } from './Post'
import { readPost,
         addPost,
         downVotePost,
         upVotePost,
         deletePost,
         updatePost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress';

class PostContainer extends Component{


  componentWillMount() {

    this.props.readPost(this.props.postId)
    this.props.fetchCategories()
    //console.log(this.props)
  }


  addPost = (title, body, owner, category) => {
    this.props.addPost(title, body, owner, category)
    this.props.history.push("/")
  }

  render() {
    //console.log(this.props)

    const currentPost = this.props.post.pop()
    return (

      <Row>
        <Col xs={12}>
          <PostActions
            addPost={this.addPost}
            categories={this.props.categories}
          />
          <PostPage
            post={currentPost}
            upVote={this.props.upVotePost}
            downVote={this.props.downVotePost}
            edit={this.props.updatePost}
            delete={this.props.deletePost}
            history={this.props.history}
          />
        </Col>
      </Row>
    )
  }
}

function mapStateToProps (state) {
  return {
    post: Object.keys(state.posts).map((k) => state.posts[k]),
    postLoading: state.postLoading,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    readPost: (id) => dispatch(readPost(id)),
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

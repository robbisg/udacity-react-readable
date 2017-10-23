import React, { Component } from 'react';
import { Route , Link, withRouter } from 'react-router-dom'
import { PostActions, PostList, AddPostModal } from './Post'
import Dialog from 'material-ui/Dialog';
import { Category } from './Category'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchPosts, addPost } from '../actions/posts'
import { fetchCategories } from '../actions/categories'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton';

class Home extends Component {

  state = {
    showingPosts: [],
    isAddModal: false
  }

  componentWillMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  selectCategory = (categoryName) => {
    this.setState({selectedCategory: categoryName,
                    showingPosts: this.props.posts.filter((post) => post.category === this.state.selectedCategory)
                    })
  }

  showModal = () => {
    this.setState({isAddModal: !this.state.isAddModal})
  }

  addPost = (title, body, owner, category) => {
    this.props.addPost(title, body, owner, category)
  }

  render() {

    if (this.props.postLoading || this.props.categoryLoading){
      <p>Loading...</p>
    }

    if (this.state.isAddModal){

      return <AddPostModal
        categories={this.props.categories}
        isVisible={this.state.isAddModal}
        showModal={this.showModal}
        addPost={this.addPost}
             />

    }

      return(
          <Grid>
            <Col xs={12}>
              <Category categories={this.props.categories} selectCategory={this.selectCategory}/>
              <Row>
                <PostActions add={this.showModal}/>
                <PostList posts={this.props.posts}/>
              </Row>
            </Col>
          </Grid>
      )

    }
}

function mapStateToProps (state) {
  return {
    catposts: Object.keys(state.posts).map((k) => state.posts[k])
                   .reduce((obj, item) => {
                     obj[item.category] = obj[item.category]===undefined ? [item] : obj[item.category].concat([item])

                     return obj
                   },{}),
    posts: Object.keys(state.posts).map((k) => state.posts[k]).sort(function(a,b){return b.voteScore-a.voteScore}),

    postLoading: state.postLoading,
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
    addPost: (title, body, owner, category) => dispatch(addPost(title, body, owner, category))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))

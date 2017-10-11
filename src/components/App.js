import React, { Component } from 'react';
import { Route , Link, withRouter } from 'react-router-dom'
import Home from './Home'
import PostContainer from './PostContainer'
import '../App.css';
import * as ReadableAPI from '../utils/api'
import { fetchPosts } from '../actions/posts'
import { connect } from 'react-redux'


class App extends Component {

  state = {
    posts: [],
    categories: [],
    comments: []
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(fetchPosts())
  }


  render() {
    const { posts } = this.props
    console.log(posts)
    return (
      <div className="app">

        <Route exact path="/" render={ ({history}) =>
          <Home posts={this.props.posts} categories={this.state.categories}/>
        } />

        <Route exact path="/post/:postid" render={ ({match}) =>
          <PostContainer postId={match.params.postid} />
        } />

      </div>
    );
  }
}

function mapStateToProps ({loading, posts, comments}) {
  console.log(posts)
  return {
    posts: Object.keys(posts.posts).map((k) => posts.posts[k]),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    //fetchPosts: () => dispatch(fetchPosts()),
    //remove: (data) => dispatch(removeFromCalendar(data))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    //mapDispatchToProps
)(App))

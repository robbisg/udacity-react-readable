import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom'
import PostList from './PostList'
import '../App.css';
import * as ReadableAPI from '../utils/api'



class App extends Component {

  state = {
    posts: [],
    categories: [],
    comments: []
  }

  componentDidMount() {

    ReadableAPI.getPosts().then((data) => {this.setState({posts: data})})
    ReadableAPI.getCategories().then((data) => {
      this.setState({categories: data})
      console.log(data);
    })
  }


  render() {
    return (
      <div className="app">

        <Route exact path="/" render={ ({history}) =>
          <PostList posts={this.state.posts} categories={this.state.categories}/>
        } />

      </div>
    );
  }
}

export default App;

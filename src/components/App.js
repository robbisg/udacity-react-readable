import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom'
import Home from './Home'
import { PostPage } from './Post'
import '../App.css';
import * as ReadableAPI from '../utils/api'



class App extends Component {

  state = {
    posts: [],
    categories: [],
    comments: []
  }

  componentDidMount() {

    ReadableAPI.getPosts().then((res) => res.json()).then((data) => {this.setState({posts: data})})
    ReadableAPI.getCategories().then((data) => {
      this.setState({categories: data})
      console.log(data);
    })
  }


  render() {
    return (
      <div className="app">

        <Route exact path="/" render={ ({history}) =>
          <Home posts={this.state.posts} categories={this.state.categories}/>
        } />

        <Route path="/post/:postid" render={ ({match}) => <PostPage postId={match.params.postid} />}/>
      </div>
    );
  }
}

export default App;

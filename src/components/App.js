import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom'
import Home from './Home'
import PostContainer from './PostContainer'
import PostCreation from './PostCreation'
import '../App.css';
import * as ReadableAPI from '../utils/api'



class App extends Component {


  render() {

    return (
      <div className="app">

        <Route exact path="/" render={ ({history}) =>
          <Home />
        } />


        <Route exact path="/post/:postid" render={ ({match}) => {
          return <PostContainer postId={match.params.postid}/>
        }
        } />

      </div>
    );
  }
}

export default App;

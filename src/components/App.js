import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Home from './Home'
import PostContainer from './PostContainer'
import CommentContainer from './CommentContainer'
import { fetchCategories } from '../actions/categories'
import { Category } from './Category'
import { connect } from 'react-redux'
import { Grid, } from 'react-flexbox-grid';
import '../App.css';



class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {



    return (
      <div className="app">
        <Grid>
          <Category categories={this.props.categories}/>

          <Route exact path="/" render={ ({history}) =>
            <Home
              history={history}
              categories={this.props.categories}
            selectedCategory="all"/>
          } />

          <Route exact path="/:category" render={ ({match, history}) =>
            <Home
              history={history}
              categories={this.props.categories}
              selectedCategory={match.params.category} />
          } />




          <Route exact path="/:category/:id" render={ ({match, history}) =>
            <div>
              <PostContainer postId={match.params.id} history={history}/>
              <CommentContainer postId={match.params.id} />
            </div>

          } />
        </Grid>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps (dispatch) {
  return {

    fetchCategories: () => dispatch(fetchCategories()),

  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(App))

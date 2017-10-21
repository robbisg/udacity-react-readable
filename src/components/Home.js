import React, { Component } from 'react';
import { Route , Link, withRouter } from 'react-router-dom'
import { PostActions, PostList } from './Post'
import { Category } from './Category'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchPosts } from '../actions/posts'
import { connect } from 'react-redux'

class Home extends Component {

  state = {
    posts: [],
    categories: [],
    comments: []
  }

  componentWillMount() {
    this.props.fetchPosts()
    console.log(this.props)
  }


  render() {
      return(
          <Grid>
            <Col xs={12}>
              <Row>
                <Category categories={this.state.categories}/>
              </Row>
              <Row>
                <PostActions />
                <PostList posts={this.props.posts}/>
              </Row>
            </Col>
          </Grid>
      )

    }
}

function mapStateToProps ({loading, posts, comments}) {
  console.log(posts)
  return {
    posts: Object.keys(posts).map((k) => posts[k]),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))

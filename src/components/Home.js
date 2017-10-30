import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { PostActions, PostPage, AddPostModal } from './Post'
import RaisedButton from 'material-ui/RaisedButton';
import { Category } from './Category'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchPosts, addPost, updatePost, deletePost, editPost, upVotePost, downVotePost } from '../actions/posts'

import { connect } from 'react-redux'

class Home extends Component {

  state = {
    selectedSort:"vote"
  }

  componentWillMount() {
    this.props.fetchPosts()
  }


  selectSort = (value) => {
    this.setState({selectedSort: value})
  }


  addPost = (title, body, owner, category) => {
    this.props.addPost(title, body, owner, category)
  }

  sortbyVote = (a,b) => {return b.voteScore - a.voteScore}
  sortbyTime = (a,b) => {return a.timestamp - b.timestamp}

  filterPosts = () => {

    const posts = this.props.posts
    const categoryPosts = this.props.selectedCategory === "all" ?
    posts : posts.filter((p) => p.category === this.props.selectedCategory)
    const sortFunction = this.state.selectedSort === 'vote' ? this.sortbyVote : this.sortbyTime
    const showingPosts = categoryPosts.sort(sortFunction)
    return showingPosts

  }

  render() {

    const showingPosts = this.filterPosts()


    if (this.props.postLoading || this.props.categoryLoading){
      <p>Loading...</p>
    }


      return(
        <div>



          <Col xs={12}>

            <Row style={{margin:"15px"}}>
              <Col xs={6}>
                <PostActions
                  addPost={this.addPost}
                  categories={this.props.categories}
                />
              </Col>
              <Col xs={6}>
                <RaisedButton label="Sort by vote" onClick={() => this.selectSort("vote")}/>
                <RaisedButton label="Sort by time" onClick={() => this.selectSort("time")}/>
              </Col>
            </Row>


            <Row>
              <Col xs={12}>
                {showingPosts.map((post) => {
                  return <PostPage
                    category={post.category}
                    key={post.id}
                    post={post}
                    delete={this.props.deletePost}
                    upVote={this.props.upVote}
                    downVote={this.props.downVote}
                    edit={this.props.editPost}
                    history={this.props.history}
                         />
                })}
              </Col>
            </Row>

          </Col>

        </div>
      )

    }
}

function mapStateToProps (state) {
  return {
    posts: Object.keys(state.posts).map((k) => state.posts[k]).filter((p) => !p.deleted).sort(function(a,b){return b.voteScore-a.voteScore}),
    postLoading: state.postLoading,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),

    addPost: (title, body, owner, category) => dispatch(addPost(title, body, owner, category)),
    upVote: (id) => dispatch(upVotePost(id)),
    downVote: (id) => dispatch(downVotePost(id)),
    updatePost: (id, title, body) => dispatch(updatePost(id, title, body)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))

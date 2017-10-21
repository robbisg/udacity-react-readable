import React, { Component } from 'react'
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { Link } from 'react-router-dom'
import { AddComment } from './Comment'

export class PostActions extends Component {

  render() {
    const linkTo = "/post/edit";
    return (
      <Col xs={6}>
        <h3></h3>
        <Row>
          <FlatButton label="Add Post" />
          <Link to={linkTo}><FlatButton label="Edit Post" /></Link>
          <FlatButton label="Delete Post" />
        </Row>
      </Col>

    )
  }
}



export class PostCard extends Component {


  render() {
      const linkTo = "/post/"+this.props.post.id;
      console.log(this.props.post)
      return (
        <Card style={{margin:'10px'}}>
          <Link to={linkTo}>
            <CardHeader
              title={this.props.post.title}
              subtitle={this.props.post.author}
              actAsExpander={false}
              showExpandableButton={true}
            />
          </Link>
          <CardText expandable={false}>
            <Row><Col xs={12}>{this.props.post.body}</Col></Row>
            <Row>
              <Col xs={6}>Comments:</Col>
              <Col xs={6}>Score: {this.props.post.voteScore}</Col>
            </Row>
          </CardText>
        </Card>
      )

    }
}

export class PostList extends Component {

  render() {
      return(
        <Col xs={12}>
          {this.props.posts.map((post) => {
            return <PostCard post={post} />
          })}
        </Col>
      )

    }
}

export class PostPage extends Component {


  render (){
    const post = this.props.post
    console.log(this.props)
    return (
      <Card>
        <CardText>
          <Row>
            <Col xs={7}>
              <h2>{post.title}</h2>
              <h4>by {post.author}</h4>
              <p>{post.body}</p>
            </Col>
            <Col xs={4} style={{textAlign: 'center'}}>

              <IconButton iconClassName="material-icons" onClick={(event) => this.props.upVote(post.id)} >add</IconButton>
              <div style={{fontSize: '30px'}}>{post.voteScore}</div>
              <IconButton iconClassName="material-icons" onClick={(event) => this.props.downVote(post.id)}>remove</IconButton>

            </Col>
          </Row>
        </CardText>
      </Card>
    )
  }
}

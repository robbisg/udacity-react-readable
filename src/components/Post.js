import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { Route , Link } from 'react-router-dom'
import { CommentList, AddComment } from './Comment'
import * as ReadableAPI from '../utils/api'

export class PostActions extends Component {

  render() {
    return (
      <Col xs={6}>
        <h3></h3>
        <Row>
          <FlatButton label="Default" />
        </Row>
      </Col>

    )
  }
}



export class PostSmall extends Component {


  render() {
      const linkTo = "/post/"+this.props.post.id;
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
            return <PostSmall post={post} />
          })}
        </Col>
      )

    }
}


export class PostPage extends Component{

  state = {
    post : {}
  }

  componentDidMount() {
    ReadableAPI.getPostById(this.props.postId).then((data) => {this.setState({post: data})})
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <PostBig post={this.state.post} />
          <CommentList postId={this.props.postId}/>
          <AddComment />
        </Col>
      </Row>
    )
  }
}


export class PostBig extends Component {
  render (){
    const style = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <Card>
        <CardText>
          <Row>
            <Col xs={7}>
              <h2>{this.props.post.title}</h2>
              <h4>by {this.props.post.author}</h4>
              <p>{this.props.post.body}</p>
            </Col>
            <Col xs={4} >
              <Paper style={style} zDepth={1} circle={true}>
                <IconButton iconClassName="material-icons" tooltip="upVote Post">add</IconButton>
                <div style={{fontSize: '30px'}}>{this.props.post.voteScore}</div>
                <IconButton iconClassName="material-icons" tooltip="downVote Post">remove</IconButton>
              </Paper>
            </Col>
          </Row>
        </CardText>
      </Card>
    )
  }
}

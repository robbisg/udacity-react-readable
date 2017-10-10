import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as ReadableAPI from '../utils/api';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchComments } from '../actions/comments'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton';



export class CommentList extends Component {

  render () {
    return (
      <Row>
        <Col xs={12}>
          <h4>Comments</h4>
          {this.props.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        </Col>
      </Row>
    )
  }
}


export class Comment extends Component{

  render(){
    return(
      <div style={{margin:'10px'}} >
        <Card style={{padding:'10px'}}>
          <Row middle="xs">
            <Col xs={1} style={{textAlign:'center'}}>
              <IconButton iconClassName="material-icons">add</IconButton>
                <div>{this.props.comment.voteScore}</div>
              <IconButton iconClassName="material-icons">remove</IconButton>
            </Col>
            <Col xs={7}>

                <p>{this.props.comment.body}</p><br />
                <p>author: {this.props.comment.author}</p>

            </Col>
            <Col xs={4}>
              <FlatButton label="Edit" />
              <FlatButton label="Delete" />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export class AddComment extends Component {
  render(){
    return (
      <Card style={{margin: '10px', padding:'10px'}}>
        <Row>
          <Col xs={12}>
                <TextField hintText="Insert Comment" />
                <TextField hintText="Insert Author" />
                <FlatButton label="Add Comment" />
          </Col>
        </Row>
      </Card>
    )
  }


}

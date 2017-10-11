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
          {this.props.comments.map((comment) => <Comment key={comment.id}
                comment={comment}
                upVote={this.props.upVote}
                downVote={this.props.downVote}/>)}
        </Col>
      </Row>
    )
  }
}


export class Comment extends Component{

  render(){
    const comment = this.props.comment
    return(
      <div style={{margin:'10px'}} >
        <Card style={{padding:'10px'}}>
          <Row middle="xs">
            <Col xs={1} style={{textAlign:'center'}}>
              <IconButton iconClassName="material-icons" onClick={() => this.props.upVote(comment.id)}>add</IconButton>
              <div>{comment.voteScore}</div>
              <IconButton iconClassName="material-icons" onClick={() => this.props.downVote(comment.id)}>remove</IconButton>
            </Col>
            <Col xs={7}>

              <p>{comment.body}</p><br />
              <p>author: {comment.author}</p>

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

  state = {
    comment: "",
    author: ""
  }

  addComment(event) {
    const { comment, author } = this.state
    console.log(this.props)
    this.props.addComment(comment, author, this.props.id)

  }

  onChange = (e) => {
    //const state = this.state
    //state[e.target.name] = e.target.value;
    this.setState({[e.target.name] :e.target.value});
  }

  render(){

    return (
      <Card style={{margin: '10px', padding:'10px'}}>
        <Row>
          <Col xs={12}>
            <TextField hintText="Insert Comment"
              name="comment" value={this.state.comment}
              onChange={this.onChange}
            />
            <TextField hintText="Insert Author"
              name="author" value={this.state.author}
              onChange={this.onChange}
            />
            <FlatButton label="Add Comment" onClick={(e) => this.addComment(e)} />
          </Col>
        </Row>
      </Card>
    )
  }


}

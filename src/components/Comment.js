import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { VoteComponent } from './Common'
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as ReadableAPI from '../utils/api';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { fetchComments } from '../actions/comments'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

export class CommentContents extends Component {

  render(){
    if (!this.props.editable){
      return (
        <div>
          <p>{this.props.body}</p><br />
          <p>author: {this.props.author}</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <TextField hintText="Insert Comment"
            name="body" value={this.props.body}
            onChange={(e) => this.props.action(e)}
          />
          <p>author: {this.props.author}</p>
        </div>
      )
    }
  }

}


export class CommentList extends Component {

  render () {
    console.log(this.props.comments)
    return (
      <Row>
        <Col xs={12}>
          <h3>Comments</h3>
          {
            this.props.comments.filter((comment) => !comment.deleted)
            .map((comment) => <Comment key={comment.id}
              comment={comment}
              upVote={this.props.upVote}
              downVote={this.props.downVote}
              deleteComment={this.props.deleteComment}
              updateComment={this.props.updateComment}
                              />
            )

          }

        </Col>
      </Row>
    )
  }
}


export class Comment extends Component{

  state = {
    editClicked: false,
    body: this.props.comment.body,
  }

  handleEdit = (e) => {
    e.preventDefault()
    if (this.state.editClicked === false){
      this.setState({editClicked: true})
    }
    else {
      this.props.updateComment(this.props.comment.id, this.state.body)
      this.setState({editClicked: false})
    }
  }

  onChangeEdit = (e) => {
    e.preventDefault()
    this.setState({[e.target.name] :e.target.value});
  }


  render(){
    const comment = this.props.comment

      return(
        <div style={{margin:'10px'}} >
          <Card style={{padding:'10px'}}>
            <Row middle="xs">
              <Col xs={1} style={{textAlign:'center'}}>
                <VoteComponent
                  id={comment.id}
                  upVote={this.props.upVote}
                  downVote={this.props.downVote}
                  value={comment.voteScore} />
              </Col>
              <Col xs={7}>
                <CommentContents
                  body={this.state.body}
                  author={comment.author}
                  editable={this.state.editClicked}
                  action={this.onChangeEdit} />
              </Col>
              <Col xs={4}>
                <FlatButton
                  label="Edit"
                  onClick={(event) => this.handleEdit(event)}
                />

                <FlatButton
                  label="Delete"
                  onClick={() => this.props.deleteComment(comment.id)}
                  disabled={this.state.editClicked}
                />
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
    event.preventDefault()
    const { comment, author } = this.state
    this.props.addComment(comment, author, this.props.id)

  }

  onChange = (e) => {
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

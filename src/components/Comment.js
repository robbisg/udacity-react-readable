import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Route , Link } from 'react-router-dom';
import * as ReadableAPI from '../utils/api';
import { Grid, Row, Col } from 'react-flexbox-grid';


export class CommentList extends Component {
  state = {
    comments: []
  }

  componentDidMount(){
    ReadableAPI.getPostComments(this.props.postId).then((data) => this.setState({comments: data}))
  }

  render () {
    return (
      <Row>
        <Col xs={12}>
          <h4>Comments</h4>
          {this.state.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
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
            <Col xs={1}><Row center="xs">{this.props.comment.voteScore}</Row></Col>
            <Col xs={7}><Card ><CardText>{this.props.comment.body}</CardText></Card></Col>
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
                <TextField hintText="Full width" />
                <FlatButton label="Add Comment" />
          </Col>
        </Row>
      </Card>
    )
  }


}

import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';

export class VoteComponent extends Component {

  render() {
    return (
      <div>
        <IconButton iconClassName="material-icons" onClick={() => this.props.upVote(this.props.id)}>add</IconButton>
        <div style={this.props.fontStyle}>{this.props.value}</div>
        <IconButton iconClassName="material-icons" onClick={() => this.props.downVote(this.props.id)}>remove</IconButton>
      </div>
    )
  }

}

export class ActionComponent extends Component {
  render() {
    return (
      <div>
        <h3></h3>
        <FlatButton label="Edit" onClick={(e) => this.props.handleEdit()}/>
        <FlatButton label="Delete" onClick={(e) => this.props.handleDelete()}/>
      </div>
    )
  }


}

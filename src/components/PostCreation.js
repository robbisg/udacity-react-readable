import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { fetchCategories } from '../actions/categories'
import { Route , Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class PostCreation extends Component{

  state = {
    value: ""
  }

  handleMenu = (event, index, value) => {
    this.setState({value})
    console.log(event, index, value)
    this.sendChange("category", value)
  };

  onChange = (e) => {
    this.sendChange(e.target.name, e.target.value)
  }

  sendChange = (field, value) => {
    this.props.changeState(field, value)

  }

  render() {

    return (
      <Row>
        <Col xs={12}>
          <TextField
            name="title"
            fullWidth={true}
            floatingLabelText="Insert title"
            onChange={(e) => this.onChange(e)}
          /><br />
        </Col>

        <Col xs={12}>
          <TextField
            name="body"
            fullWidth={true}
            floatingLabelText="Insert text"
            onChange={(e) => this.onChange(e)}
          /><br />
        </Col>
        <Col xs={6}>
          <TextField
            name="owner"
            floatingLabelText="Insert author"
            onChange={(e) => this.onChange(e)}
          /><br />
        </Col>
        <Col xs={6}>
          <SelectField
            name="category"
            floatingLabelText="Select Category"
            value={this.state.value}
            onChange={this.handleMenu}
          >
            {this.props.categories.map((cat, i) => {
              return <MenuItem key={cat.name} value={cat.name} primaryText={cat.name}/>})}

          </SelectField>
        </Col>
      </Row>
    )
  }
}

export default PostCreation;

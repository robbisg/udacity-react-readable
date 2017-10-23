import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

const styles = {
    chip: {
      margin: '2px',
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  };

export class Category extends Component{
  render() {
      return (

          <Col xs={6}>
            <h3>Categories</h3>
            <Row>
              <Col xs={6}><CategoryList categories={this.props.categories} selectCategory={this.props.selectCategory}/></Col>
            </Row>
          </Col>
      )

    }
}

export class CategoryList extends Component{
  render (){
    console.log(this.props.categories)
    return (

        <Row>
          {this.props.categories.map((category) => {
            return <Col key={category.name} xs={this.props.categories.length}>
              <Chip style={styles.chip} onClick={() => this.props.selectCategory(category.name)}>{category.name}</Chip>
            </Col>
            })}
        </Row>

    )
  }
}


export class AddCategory extends Component{
  render (){
    return (
        <Row>
          <Col xs={9}><TextField fullWidth={true} hintText="Category name"/></Col>
          <Col xs={3}><FlatButton label="Add category" /></Col>
        </Row>
    )
  }
}

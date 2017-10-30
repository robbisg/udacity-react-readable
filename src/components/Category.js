import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom'
import {Card, CardText} from 'material-ui/Card';

export class Category extends Component{
  render() {


      return (
        <Card>
          <Col xs={6}>
            <h3></h3>


            <Row>
              <Col xs={3}>
                <Link to="/"><FlatButton label="Home"/></Link>
              </Col>
              {this.props.categories.map((category) => {
                return <Col key={category.name} xs={3}>
                  <Link to={category.name}>
                    <FlatButton label={category.name}/>
                  </Link>
                </Col>
              })}

            </Row>

          </Col>
        </Card>
      )

    }
}

import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom'


export class Category extends Component{
  render() {

    const styles = {
        chip: {
          margin: '2px',
        },
        wrapper: {
          display: 'flex',
          flexWrap: 'wrap',
        },

      };
      return (

          <Col xs={6}>
            <h3>Categories</h3>
            <Row>
              <Col xs={6}>

                <Row>
                  {this.props.categories.map((category) => {
                    return <Col key={category.name} xs={3}>
                      <Link to={category.name}>
                        <Chip
                          className={category.name}
                          style={styles.chip}>

                          {category.name}

                        </Chip>
                      </Link>
                    </Col>
                  })}
                  <Col xs={3}>
                    <Link to="/"><Chip style={styles.chip}>all</Chip></Link>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
      )

    }
}

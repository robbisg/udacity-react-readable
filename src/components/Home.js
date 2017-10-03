import React, { Component } from 'react';
import { PostActions, PostList } from './Post'
import { Category } from './Category'
import { Grid, Row, Col } from 'react-flexbox-grid';


class Home extends Component {


  render() {
      return(
          <Grid>
            <Col xs={12}>
              <Row>
                  <Category categories={this.props.categories}/>
              </Row>
              <Row>
                <PostActions />
                <PostList posts={this.props.posts}/>
              </Row>
            </Col>
          </Grid>
      )

    }
}

export default Home;

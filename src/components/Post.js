import React, { Component } from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';


export class Filter extends Component {


  render() {
      return (
        <div>
          <Card>

            {this.props.categories.map((category) => {
              return <Chip>{category.name}</Chip>
            })}

          </Card>
        </div>
      )

    }
}


export class PostSmall extends Component {


  render() {
      return (
        <Card>
          <CardActions>
            Prova
          </CardActions>
        </Card>
      )

    }
}

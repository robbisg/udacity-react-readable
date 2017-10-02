import React, { Component } from 'react';
import { Filter, PostSmall } from './Post'


class PostList extends Component {


  render() {
      return(
        <div>
          <Filter categories={this.props.categories}/>

          {this.props.posts.map((post) => {
            return <PostSmall post={post} />
          })}
        </div>
      )

    }
}

export default PostList;

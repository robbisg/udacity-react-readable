import React, { Component } from 'react'
import {Card, CardText} from 'material-ui/Card';
import { Row, Col } from 'react-flexbox-grid';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { VoteComponent, ActionComponent } from './Common'
import { PostCreation, PostEditor } from './PostModals'
import Dialog from 'material-ui/Dialog';
import { Link } from 'react-router-dom'

export class PostActions extends Component {

  state = {
    showingModal: false
  }

  showModal = () => {
    this.setState({showingModal: !this.state.showingModal})
  }

  addPost = (title, body, owner, category) => {
    this.props.addPost(title, body, owner, category)
    this.showModal()
  }

  render() {
    return (

      <div key={0}>
        <Col xs={6}>
          <Row>
            <FlatButton label="Add Post" onClick={() => this.showModal()}/>
          </Row>
        </Col>

        <AddPostModal
          categories={this.props.categories}
          isVisible={this.state.showingModal}
          showModal={this.showModal}
          addPost={this.addPost}
        />
      </div>

    )
  }
}


export class PostPage extends Component {

  state = {
    showModal: false,
  }

  handleEdit = () => {
    this.setState({showModal: !this.state.showModal})

  }

  handleDelete = () => {
    this.props.delete(this.props.post.id)
    //console.log(this.props.history)
    this.props.history.push("/")
  }

  editPost = (title, body) => {

    this.props.edit(this.props.post.id, title, body)
    this.handleEdit()
  }


  render (){
    const post = this.props.post
    //console.log(this.props)
    const linkTo = "/"+post.category+"/"+post.id;
    const date = new Date(post.timestamp);
    const datevalues = {
         'year':date.getFullYear(),
         'month':date.getMonth()+1,
         'day': date.getDate(),
      };



    return (
      <div>
        <EditPostModal
          post={post}
          edit={this.editPost}
          isVisible={this.state.showModal}
          showModal={this.handleEdit}
        />
        <Card style={{margin:'10px'}}>
          <CardText>
            <Row>
              <Col xs={4}>
                <Link to={linkTo}><h2>{post.title}</h2></Link>
                <h4>by {post.author}</h4>
                <p>{post.body}</p>
                <p>{datevalues.year} / {datevalues.month} / {datevalues.day}</p>
              </Col>
              <Col xs={4} style={{textAlign: 'center'}}>
                <VoteComponent
                  fontStyle={{fontSize: '30px'}}
                  id={post.id}
                  value={post.voteScore}
                  upVote={this.props.upVote}
                  downVote={this.props.downVote} />

              </Col>
              <Col xs={4}>
                <ActionComponent handleEdit={this.handleEdit} handleDelete={this.handleDelete} />
              </Col>
            </Row>
          </CardText>
        </Card>
      </div>
    )
  }
}

export class EditPostModal extends Component {

  state = {
    body: this.props.post.body,
    title: this.props.post.title
  }


  handleEdit(event) {
    event.preventDefault()
    const { body, title } = this.state
    this.props.edit(title, body)

  }


  changeState = (field, value) => {
    this.setState({[field]:value});
  }


  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={() => this.props.showModal()}
        />,
        <FlatButton
          label="Edit Post"
          primary={true}
          onClick={(e) => this.handleEdit(e)}
        />,
      ];

    return (
      <Dialog
        title="Post Editor"
        modal={false}
        actions={actions}
        open={this.props.isVisible}
        onRequestClose={() => this.props.showModal()}
      >
        <PostEditor
          category={this.props.post.category}
          title={this.state.title}
          body={this.state.body}
          owner={this.props.post.author}
          changeState={this.changeState}
        />
      </Dialog>
    );
  }

}


export class AddPostModal extends Component {


  state = {
    body: "",
    owner: "",
    category: "",
    title: ""
  }

  handleAdd(event) {
    event.preventDefault()
    const { body, owner, category, title } = this.state
    //console.log(this.state)
    this.props.addPost(title, body, owner, category)

  }


  changeState = (field, value) => {
    this.setState({[field]:value});
  }


  render() {
    const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onClick={() => this.props.showModal()}
        />,
        <FlatButton
          label="Add Post"
          primary={true}
          onClick={(e) => this.handleAdd(e)}
        />,
      ];

    return (
      <Dialog
        title="Post Creator"
        modal={false}
        actions={actions}
        open={this.props.isVisible}
        onRequestClose={() => this.props.showModal()}
      >
        <PostCreation categories={this.props.categories} changeState={this.changeState}/>
      </Dialog>
    );
  }
}

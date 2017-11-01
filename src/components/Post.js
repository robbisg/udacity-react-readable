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

      <div>
        <Col xs={6}>
          <FlatButton label="Add Post" onClick={() => this.showModal()}/>
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

  getDate = (timestamp) => {
    const date = new Date(timestamp);
    const datevalues = {
         'year':date.getFullYear(),
         'month':date.getMonth()+1,
         'day': date.getDate(),
      };
    return datevalues
  }

//   static defaultProps = {
//   post: {
//     id: '',
//     category: '',
//     title: '',
//     timestamp: '',
//     commentCount: ''
//   },
// };


  render (){
    console.log(this.props)

    if (this.props.post.length === 0){
      console.log("I'm here")
      return(
        <DeletePostModal history={this.props.history} isVisible={true}/>
          )
    }

    const post = this.props.post
    const linkTo = "/"+post.category+"/"+post.id;
    const datevalues = this.getDate(post.timestamp)



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
                <hr/>
                <Row>
                  <Col xs={6}>{datevalues.year} / {datevalues.month} / {datevalues.day}</Col>
                  <Col xs={6}>Comments: {post.commentCount}</Col>
                </Row>
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

export class DeletePostModal extends Component {


  showModal = () => {
    this.setState({isVisible: !this.props.isVisible});
    this.props.history.push("/")
  }


  render() {
    const actions = [
        <FlatButton
          label="Ok"
          primary={true}
          onClick={() => this.showModal()}
        />,
      ];

    return (
      <Dialog
        title="Error"
        modal={false}
        actions={actions}
        open={this.props.isVisible}
        onRequestClose={() => this.showModal()}
      >
        The post has been deleted!
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

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CommentInput from '../Components/CommentInput'
import {addComment} from "../reducer/comment"

class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func,
  }

  constructor() {
    super()
    this.state = {username: ''}
  }

  componentWillMount() {
    this._loadUsername()
  }


  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  _loadUsername() {
    const username = localStorage.getItem('username')
    if (username) {
      this.setState({username})
    }
  }

  handleSubmit = (comment) => {
    if(!comment) return
    if(!comment.username) return alert('请输入用户名')
    if(!comment.content) return alert('请输入评论内容')

    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))

    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render() {
    return (
      <CommentInput
        onSubmit={this.handleSubmit}
        onUserNameInputBlur={this._saveUsername}
        username={this.state.username}/>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentInputContainer)

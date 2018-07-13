import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import CommentList from '../Components/CommentList'
import {initComment, deleteComment} from "../reducer/comment"


class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComment: PropTypes.func,
    onDeleteComment: PropTypes.func,
  }

  componentWillMount() {
    this._loadComments()
  }

  _loadComments() {
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    this.props.initComment(comments)
  }

  handleDeleteComment = (index) => {
    const {comments} = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <CommentList
        onDeleteComment={this.handleDeleteComment}
        comments={this.props.comments}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comment: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initComment: (comments) => {
      dispatch(initComment(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)

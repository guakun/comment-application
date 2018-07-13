import React, {Component} from 'react'
import Comment from './Comment'

class CommentList extends Component {
  static defaultProps = {
    comments: []
  }

  handleDeleteComment = (index) => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <div>
        {
          this.props.comments.map((comment, i) => {
            return (
              <Comment
                key={i}
                comment={comment}
                index={i}
                onDeleteComment={this.handleDeleteComment}
              />
            )
          })
        }
      </div>
    )
  }
}

export default CommentList

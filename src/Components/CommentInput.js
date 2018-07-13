import React, {Component} from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func,
  }

  static defaultProps = {
    username: ''
  }

  constructor() {
    super()
    this.state = {
      username: this.props.username,
      content: '',
    }
  }

  componentDidMount() {
    this.textarea.focus()
  }

  handleUsernameChange = (event) => {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur()
    }
  }

  handleContentChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      const {username, content} = this.state
      this.props.onSubmit({username, content, createdTime: new Date()})
    }
    this.setState({content: ''})
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名:</span>
          <div className="comment-field-input">
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleUsernameBlur}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容:</span>
          <div className="comment-field-input">
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange}
              ref={(textarea) => {
                this.textarea = textarea
              }}/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    )
  }
}

export default CommentInput

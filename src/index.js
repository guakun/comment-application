import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CommentApp from './container/CommentApp'
import commentsReducer from './reducer/comment'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(commentsReducer)

ReactDOM.render(
  <Provider store={store}>
    <CommentApp />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

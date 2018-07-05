import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import todoReducer from './store/reducers/todoReducer'

// Our custom loggin middleware. Just logs all the actions that are dispatched
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  todoReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)

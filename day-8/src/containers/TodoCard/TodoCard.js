import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/'

import TodoInput from '../../components/TodoInput/TodoInput'
import TodoList from '../../components/TodoList/TodoList'

import classes from './TodoCard.css'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

class TodoCard extends Component {
  addTodo = content => {
    this.props.createTodo(this.props.todos, content)
  }

  toggleTodo = id => {
    const todos = this.props.todos.map(
      todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )
    this.props.updateTodo(todos)
  }

  deleteTodo = id => {
    this.props.deleteTodo(this.props.todos, id)
  }

  onDragEnd = result => {
    if (!result.destination) {
      return
    }
    const todos = reorder(
      this.props.todos,
      result.source.index,
      result.destination.index
    )
    this.props.updateTodo(todos)
  }

  componentDidMount () {
    this.props.getTodos()
  }

  render () {
    return (
      <Card className={classes.TodoCard}>
        <TodoInput addTodo={this.addTodo} />
        <TodoList
          todos={this.props.todos}
          toggleTodo={this.toggleTodo}
          deleteTodo={this.deleteTodo}
          onDragEnd={this.onDragEnd}
        />
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos
  // todos: state.todo.todos  For use when combining reducers
})

const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(actionCreators.getTodosAsync()),
  createTodo: (todos, content) =>
    dispatch(actionCreators.createTodosAsync(todos, content)),
  updateTodo: todos => dispatch(actionCreators.updateTodosAsync(todos)),
  deleteTodo: (todos, id) =>
    dispatch(actionCreators.deleteTodosAsync(todos, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoCard)

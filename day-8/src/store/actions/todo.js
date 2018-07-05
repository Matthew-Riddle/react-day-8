import axios from '../../axios-instance'

export const GET_TODOS = 'GET_TODOS'
export const UPDATE_TODO = 'UPDATE_TODO'
export const CREATE_TODO = 'CREATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

const getTodos = todos => ({
  type: GET_TODOS,
  todos
})

export const getTodosAsync = () => dispatch => {
  axios.get('/todos.json').then(response => {
    dispatch(getTodos(response))
  })
}

const updateTodos = todos => ({
  type: GET_TODOS,
  todos
})

export const updateTodosAsync = todos => {
  return dispatch => {
    axios.put(`/todos.json`, todos).then(() => dispatch(updateTodos(todos)))
  }
}

const createTodos = todos => ({
  type: GET_TODOS,
  todos
})

export const createTodosAsync = (oldTodos, content) => {
  const todos = [
    ...oldTodos,
    { id: oldTodos.length, content, completed: false }
  ]
  return dispatch => {
    axios.put('/todos.json', todos).then(() => {
      dispatch(createTodos(todos))
    })
  }
}

const deleteTodos = todos => ({
  type: GET_TODOS,
  todos
})

export const deleteTodosAsync = (todos, id) => dispatch =>
  axios
    .delete(`/todos/${id}.json`)
    .then(() =>
      dispatch(deleteTodos(this.props.todos.filter(todo => todo.id !== id)))
    )

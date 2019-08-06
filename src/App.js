import * as  React from 'react';
import { connect } from "react-redux";
import cx from "classnames" 

// components
import Async from "components/Async/Async";

// css
import './App.css';

//actions
import {fetchAllTodosAction, createTodosAction, updateTodosAction, deleteTodosAction} from "actions/todos";

// constants
import {IN_PROGRESS} from "constants/loader"


const TodosList = ({todos, editTodo, deleteTodo, formUiState}) => {
  return( todos.length > 0 ?(
      todos.map(todo => (<tr key={todo.id}>
      <td>{todo.name}</td>
      <td>{todo.completed.toString()}</td>
      <td><button className={cx("button", { "is-loading": formUiState === IN_PROGRESS})} onClick={() => editTodo(todo)}>Update</button></td>
      <td><button className={cx("button", { "is-loading": formUiState === IN_PROGRESS})} onClick={() => deleteTodo(todo)}>Delete</button></td>
      </tr>))
) : "No todos to show. Add one"
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todoId: "",
      todoText: "",
      todoCompleted: false,
      isEditing: false
    }
  }

  handleTodoText = (e) => {
    this.setState({todoText: e.target.value})
  }

  toggleTodoCompleted = (e) => {
    this.setState({todoCompleted: e.target.checked});
  }

  addUpdateTodo = async (e) => {
    e.preventDefault();
    if(this.state.isEditing){
      try{
        const updateTodoResponse = await this.props.updateTodosAction(this.state.todoId, {
          name: this.state.todoText,
          completed:this.state.todoCompleted
        })
        this.setState({
          todoId: "",
          todoText: "",
          todoCompleted: false,
          isEditing: false
        })
        if(updateTodoResponse.id){
          this.fetchAllTodos()
          // this.setState({isEditing: false})
        }
      }catch(err){
        console.log(err)
      }
    }else{
      try{
        const createTodoResponse = await this.props.createTodosAction(this.state.todoText)
        this.setState({
        todoId: "",
        todoText: "",
        todoCompleted: false,
        isEditing: false
      })
        if(createTodoResponse.id){
          this.fetchAllTodos()
        }
      }catch(err){
        console.log(err)
      }
    }

  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  fetchAllTodos = () => {
    this.props.fetchAllTodosAction()
  }

  editTodo = (todo) => {
    this.setState({isEditing: true, todoText: todo.name, todoCompleted: todo.completed, todoId: todo.id})
  }

  deleteTodo = async (todo) => {
    const deleteTodoResponse = await this.props.deleteTodosAction(todo.id)
    if(deleteTodoResponse.id){
      window.alert("Deleted Successfully")
    }
  }


  render(){
    return (
      <div className="App container">
      <h1>Add/Update Todo</h1>
      <form onSubmit={this.addUpdateTodo}>
      <div className="control">
        <label for="name">Todo: </label>
        <input value={this.state.todoText} onChange={this.handleTodoText} id="name" />
      </div>
      <div className="control">
          <label for="todo-completed">Todo Completed: </label>
          <input type="checkbox" name="todo-completed" onChange={this.toggleTodoCompleted} checked={this.state.todoCompleted} />
      </div>
      <input type="submit" value="Submit" className={cx("button", { "is-loading": this.props.formUiState === IN_PROGRESS})}/>
      </form>
      <h1>All Todos</h1>
      <table className="table">
        <thead>
          <th>Name</th>
          <th>Completed</th>
          <th>Update</th>
          <th>Delete</th>
        </thead>
        <tbody>
        <Async
          uiState={this.props.uiState}
          error={this.props.errors}
          onSuccess={() => (
        <TodosList todos={this.props.todos} editTodo={this.editTodo} deleteTodo={this.deleteTodo} formUiState={this.props.formUiState} />
        )} />
        </tbody>
      </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos.listing,
    uiState: state.todos.uiState,
    errors: state.todos.errors,
    formErrors: state.todos.formErrors,
    formUiState: state.todos.formUiState
  };
};

const mapDispatchToProps = {
  fetchAllTodosAction,
  createTodosAction,
  updateTodosAction,
  deleteTodosAction
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


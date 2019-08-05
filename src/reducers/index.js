import {combineReducers} from "redux"

import todosReducer from "reducers/todos"

export default combineReducers({todos: todosReducer})

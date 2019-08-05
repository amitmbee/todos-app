import {fetchAllTodos, createTodo, updateTodo, deleteTodo} from "services/todos"

import {TODOS_FETCH_IN_PROGRESS, TODOS_FETCH_SUCCESS, TODOS_FETCH_FAILED, TODOS_FORM_SUCCESS,TODOS_FORM_IN_PROGRESS, TODOS_FORM_FAILED} from "constants/actions"


const setInProgress = () => ({ type : TODOS_FETCH_IN_PROGRESS });

const setFormInProgress = () => ({ type : TODOS_FORM_IN_PROGRESS });


const setListing = (data) => {
  return {
    type: TODOS_FETCH_SUCCESS,
    payload: {data}
  }
}

const setDetailItem = (data) => {
  return {
    type: TODOS_FORM_SUCCESS,
    payload: {data}
  }
}

const setError = ( error) => {
  return {
    type: TODOS_FETCH_FAILED,
    payload: {error}
  }
}

export const setFormError = (error) => {
  return {
    type: TODOS_FORM_FAILED,
    payload: { error },
  };
};


export const fetchAllTodosAction = () => {
  return async (dispatch) =>{
    dispatch(setInProgress());
    try {
      const { data } = await fetchAllTodos();
      dispatch(setListing( data));
      return data;
    } catch (err) {
      let message;
      if (err.response) {
        if (err.response.data) {
          message = err.response.data.message;
        }
        message = message || err.response.statusText;
      }
      const error = {
        message: message || err.message,
      };
      dispatch(setError( error));
    }
  }
};

export const createTodosAction = (todoTitle) => {
  return async (dispatch) => {
    dispatch(setFormInProgress());
    try {
      const { data } = await createTodo({name: todoTitle});
      return data;
    } catch (err) {
      let message;
      if (err.response) {
        if (err.response.data) {
          message = err.response.data.message;
        }
        message = message || err.response.statusText;
      }
      const error = {
        message: message || err.message,
      };
      dispatch(setFormError( error));
    }
  };
}

export const updateTodosAction = (id, params) => {
  return async (dispatch) => {
    dispatch(setFormInProgress());
    try {
      const { data } = await updateTodo(id, params);
      return data;
    } catch (err) {
      let message;
      if (err.response) {
        if (err.response.data) {
          message = err.response.data.message;
        }
        message = message || err.response.statusText;
      }
      const error = {
        message: message || err.message,
      };
      dispatch(setFormError( error));
    }
  };
}


export const deleteTodosAction = (id) => {
  return async (dispatch) => {
    dispatch(setFormInProgress());
    try {
      const { data } = await deleteTodo(id);
      dispatch(fetchAllTodosAction(data));
      return data;
    } catch (err) {
      let message;
      if (err.response) {
        if (err.response.data) {
          message = err.response.data.message;
        }
        message = message || err.response.statusText;
      }
      const error = {
        message: message || err.message,
      };
      dispatch(setFormError( error));
    }
  };
}




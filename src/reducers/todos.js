
// constants
import {TODOS_FETCH_SUCCESS,TODOS_FETCH_FAILED, TODOS_FORM_IN_PROGRESS, TODOS_FORM_FAILED, TODOS_FORM_SUCCESS} from "constants/actions"

import {FAILED, SUCCESS, IN_PROGRESS} from "constants/loader";

export const initialState = {
  listing: [],
  uiState: "",
  errors: {},
  formErrors: {},
  formUiState: ""
}


const todosReducer =  (state = initialState, action = {}) => {
  switch(action.type){
    case IN_PROGRESS:
      return {
        ...state, uiState: IN_PROGRESS
      }
    case TODOS_FETCH_SUCCESS:
      return {
        ...state, uiState: SUCCESS, listing: action.payload.data
      }
    case TODOS_FETCH_FAILED:
      return {
        ...state, uiState: FAILED
      }
    case TODOS_FORM_IN_PROGRESS:
      return {
        ...state, formUiState: IN_PROGRESS
      }
    case TODOS_FORM_SUCCESS:
      return{
        ...state, formUiState: SUCCESS, listing: [...state.listing, action.payload.data]
      }
    case TODOS_FORM_FAILED:
      return {
        ...state, formUiState: FAILED, formErrors: action.payload.errors
      }
    default: return {
      ...initialState
    }
  }
}

export default todosReducer;

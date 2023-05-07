import { alertActionTypes } from "../actions/alertActions";

const initialState = {
  success: null,
  error: null,
  info: null,
  warning: null
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActionTypes.SHOW_SUCCESS:
      return {
        ...state,
        success: action.message
      }
    case alertActionTypes.SHOW_ERROR:
      return {
        ...state,
        error: action.message
      }
    case alertActionTypes.SHOW_INFO:
      return {
        ...state,
        info: action.message
      }
    case alertActionTypes.SHOW_WARNING:
      return {
        ...state,
        warning: action.message
      }
    case alertActionTypes.CLEAR_ALERT:
      return initialState

    default:
      return state;
  }
}

export default alertReducer;
import axios from "axios"
import { showError } from "./alertActions"

export const authActions = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  AUTH_LOADED: 'AUTH_LOADED',
  AUTH_FAILED: 'AUTH_FAILED',
  LOAD_TOKEN: 'LOAD_TOKEN',
}

export const signin = (user, token) => ({ type: authActions.SIGN_IN, payload: { user, token } })

export const signout = () => {
  return { type: authActions.SIGN_OUT }
}


export const loadAuth = () => {
  return (dispatch, getState) => {

    const token = localStorage.getItem('token');
    // load token first

    // if token is not in localStoarge then dispatach Auth Failed
    if (!token) return dispatch({ type: authActions.AUTH_FAILED });

    dispatch({ type: authActions.LOAD_TOKEN, payload: token ? token : null });

    axios.get('/users/profile').then(result => {
      dispatch({ type: authActions.AUTH_LOADED, payload: result.data.user })
    }).catch(error => {
      if (token)
        dispatch(showError(error.message))
    })
  }
}
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

export const loadToken = (token) => {
  return { type: authActions.LOAD_TOKEN, payload: token ? token : null }
}


export const loadAuth = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.auth.token) {
      axios.get('/users/profile').then(result => {
        dispatch({ type: authActions.AUTH_LOADED, payload: result.data.user })
      }).catch(error => {
        dispatch(showError(error.message))
      })
    }
  }
}
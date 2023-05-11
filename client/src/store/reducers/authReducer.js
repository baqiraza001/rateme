import { authActions } from "../actions/authActions";

const initialState = {
  user: null,
  token: null,
  userType: null,
  isLoaded: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.SIGN_IN:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        userType: action.payload.user.type,
        isLoaded: true
      };
    case authActions.USER_LOGGED_OUT:
      localStorage.removeItem('token')
      return initialState;
    case authActions.LOAD_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case authActions.AUTH_FAILED:
      return initialState;
    case authActions.AUTH_LOADED:
      return {
        ...state,
        user: action.payload,
        userType: action.payload.type,
        isLoaded: true
      };
    default:
      return state;
  }
}

export default authReducer;

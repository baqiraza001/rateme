import axios from "axios"
import { authActions } from "../store/actions/authActions";

export default function configureAxios(store) {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
      const state = store.getState();
      if (state.auth.token)
        config.headers.Authorization = 'Bearer ' + state.auth.token;
    }

    return config;
  }, error => Promise.reject(error));

  //handle response after sending auth header
  axios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
      store.dispatch({ type: authActions.AUTH_FAILED });
      localStorage.removeItem('token');
      return Promise.reject(new Error("Authentication Failed"));
    }
    else
      return Promise.reject(error);
  })

}
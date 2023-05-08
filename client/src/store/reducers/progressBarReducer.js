import { progressBarActionTypes } from "../actions/progressBarActions";

const initialState = { loading: false }

const progressBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case progressBarActionTypes.LOADING:
      return { loading: true }
    case progressBarActionTypes.LOADED:
      return { loading: false }
    default:
      return state;
  }
}

export default progressBarReducer;
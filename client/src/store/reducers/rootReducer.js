import { combineReducers } from "redux";
import alertReducer from "./alertReducer";

const allReducers = {
  alert: alertReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
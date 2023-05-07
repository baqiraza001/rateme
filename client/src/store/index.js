import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

let middlewares = null;
if(process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__)
  middlewares = compose( applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__() );
else
  middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, middlewares);

export default store;
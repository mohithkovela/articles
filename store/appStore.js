import { createStore, combineReducers } from "redux";
import appReducer from "../reducers/appreducer";
const rootReducer = combineReducers({ articles: appReducer });
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;

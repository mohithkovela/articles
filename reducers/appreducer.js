import { UPDATE_ARTICLES, BOOKMARK_ARTICLE } from "../constants/constants";
const initialState = {
  articles: [],
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};
export default appReducer;

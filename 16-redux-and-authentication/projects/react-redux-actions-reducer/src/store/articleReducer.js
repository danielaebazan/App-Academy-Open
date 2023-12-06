// import 'server' data
import articles from "../data/data.json";

// store:
let initialState = {
  entries: [],
  isLoading: true
};

// action creator:
const LOAD_ARTICLES = "article/loadArticles"; // type
export function loadArticles() {
  return {
    type: LOAD_ARTICLES,
    articles: articles
  };
}

// reducer:
export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    default:
      return state;
  }
}

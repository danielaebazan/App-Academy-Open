import { Route, Switch, NavLink } from "react-router-dom";
import SingleArticle from "../SingleArticle";

import { useDispatch, useSelector } from "react-redux";
import { loadArticles } from "../../store/articleReducer";
import { useEffect } from "react";

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => {
    return state.articleState.entries;
  });

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  return (
    <div>
      <h1>Article List</h1>
      <ol>
        {articles.map((article) => {
          return (
            <li key={article.id}>
              <NavLink to={`/article/${article.id}`}>{article.title}</NavLink>
            </li>
          );
        })}
      </ol>

      <Switch>
        <Route path="/article/:id">
          <SingleArticle />
        </Route>
      </Switch>
    </div>
  );
};

export default ArticleList;

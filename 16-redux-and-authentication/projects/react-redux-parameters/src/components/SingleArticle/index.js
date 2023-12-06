import "./SingleArticle.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleArticle = ({ articles1 }) => {
  //const articles = useSelector((state) => state.articleState.entries);
  const { id } = useParams();
  console.log("id", id);
  console.log("articles1", articles1);

  const articles2 = useSelector((store) => store.articleState.entries);
  console.log("articles2", articles2);

  // can use here 1 or 2
  const article = articles1.find((article) => article.id === id);

  // Reloading page  after selected article produces an error
  // it reloads data twice in curreent config and first time articles is
  // undefined
  // so checking on article

  return (
    <div className="singleArticle">
      {article && (
        <>
          <h1>{article.title}</h1>
          <img src={article.imageUrl} alt="home" />
          <p>{article.body}</p>
        </>
      )}
    </div>
  );
};

export default SingleArticle;

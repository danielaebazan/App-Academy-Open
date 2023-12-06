import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import "./ArticleInput.css";
import { addArticle } from "../../store/articleReducer";

//const articles = useSelector(state=>state.articleState.entries);

const ArticleInput = () => {
  const [newArticle, setArticle] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("newArti", newArticle);
    if (newArticle.id) dispatch(addArticle(newArticle));
    // more simple - remove this hook and useState[newArticle] and just dispatch in submit
  }, [dispatch, newArticle]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setArticle({
      id: nanoid(),
      title,
      imageUrl,
      body
    });
    // alternate can use here dispatch(addArticle(newArticle));
    reset();
  };

  const reset = () => {
    setTitle("");
    setImageUrl("");
    setBody("");
  };

  return (
    <div className="inputBox">
      <h1>Create Article</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
          name="title"
        />
        <input
          type="text"
          onChange={(e) => setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder="Image URL"
          name="imageUrl"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="body"
          placeholder="Add your entry"
          rows="10"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArticleInput;

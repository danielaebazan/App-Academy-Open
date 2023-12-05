import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { colors, codes } from "./data";

const Cat = () => {
  const history = useHistory();
  const [colorNum, setColorNum] = useState(0);
  const [statusChange, setStatusChange] = useState(
    localStorage.getItem("catStatus") || "418"
  );
  const [status, setStatus] = useState("");

  useEffect(() => {
    console.log(
      "Setting interval -has to be only once, but buggy with interval - runs every time"
    );
    let interval = setInterval(() => {
      console.log(`Running interval number  ${interval}`);

      setColorNum((prevColorNum) => {
        console.log(
          `current colorNum-wrong-: ${colorNum} ; prevColorNum - good: ${prevColorNum}`
        );
        return (prevColorNum + 1) % colors.length;
      });

      console.log(`colorNum ${colorNum} is wrong - no async - use callback`);
    }, 5000);
    console.log(`interval number ${interval} was set`);
    return () => {
      console.log(`removing last interval, i number ${interval}`);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("catStatus", statusChange);
  }, [statusChange]);

  useEffect(() => {
    if (!statusChange) {
      alert("Please Enter A Code");
      setStatusChange(404);
    } else if (!codes.includes(Number(statusChange))) {
      alert(
        `Code ${statusChange} might exist, but it is not a proper Cat Status code`
      );
      setStatusChange(404);
    }
  }, [statusChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusChange(status);
    setStatus("");
  };

  return (
    <div
      className="cat-container"
      style={{
        backgroundColor: colors[colorNum],
        transition: "background-color 4s"
      }}
    >
      <h1>Cat Status</h1>
      <button onClick={() => history.push("/")}>Home</button>
      <div className="image-container">
        <img src={`https://http.cat/${statusChange}`} alt="404" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cStatus">
          <input
            type="number"
            id="cStatus"
            onChange={(e) => setStatus(e.target.value)}
            placeholder="find new status"
            value={status}
          />
        </label>
        <button type="submit">Change Status</button>
      </form>
    </div>
  );
};

export default Cat;

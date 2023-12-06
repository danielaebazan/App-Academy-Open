import { useState, useContext } from "react";
import { HoroscopeContext } from "../context/HoroscopeContext";

const Match = () => {
  const [match, setMatch] = useState(false);

  const { sign } = useContext(HoroscopeContext);
  console.log(sign);
  return (
    <>
      <button onClick={(e) => setMatch(!match)}>match true/false</button>
      {match && <div>Match: {sign.match}</div>}
    </>
  );
};

export default Match;

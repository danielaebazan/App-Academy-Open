import PokeImage from "./images/bulbasaur.jpg";
import "./Showcase.css";
function Showcase() {
  let favPokemon = "Bulbasaur";
  let pokeCharacteristics = {
    type: "Grass",
    move: "Vine Whip"
  };

  return (
    <div className="poke-container">
      <h1>{favPokemon}'s Showcase Component</h1>
      <img src={PokeImage} style={{ borderRadius: "50%" }} alt={favPokemon} />
      <h2>
        Bulbasaurs type is{" "}
        <span className="white-on-green">{pokeCharacteristics.type}</span> and
        one of their moves is{" "}
        <span className="green-on-white">{pokeCharacteristics.move}</span>
      </h2>
    </div>
  );
}

export default Showcase;

import coffeeBeans from "./mockData/coffeeBeans.json";
import SelectedCoffeeBean from "./components/SelectedCoffeeBean.js"
import SetCoffeeBean from "./components/SetCoffeeBean.js"
function App() {
  return (
    <>
      <h1>Welcome to Coffee App</h1>
      <SelectedCoffeeBean/>
      <SetCoffeeBean coffeeBeans = {coffeeBeans} />
    </>
  );
}

export default App;
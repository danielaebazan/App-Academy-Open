import {useContextBean} from '../context/CoffeeContext'

const SelectedCoffeeBean = () => {
  const {coffeeBean} = useContextBean();
  
  return (
    <div className="selected-coffee">
      <h2>Current Selection: {coffeeBean.name}</h2>
    </div>
  );
}

export default SelectedCoffeeBean
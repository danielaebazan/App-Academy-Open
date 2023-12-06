import {useContextBean} from '../context/CoffeeContext'


const SetCoffeeBean = ({ coffeeBeans }) => {
  const {coffeeBean, setCoffeeBeanId} = useContextBean()
  
  return (
    <div className="set-coffee-bean">
      <h2>Select a Coffee Bean</h2>
      <select onChange={(e)=>setCoffeeBeanId(e.target.value)} value = {coffeeBean}
        name="coffee-bean"
      >
        {coffeeBeans.map(bean => (
          <option
            key={bean.id}
            value={bean.id}
          >
            {bean.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SetCoffeeBean;
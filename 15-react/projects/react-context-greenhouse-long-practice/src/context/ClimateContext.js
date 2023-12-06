// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%

import {createContext, useContext, useState, useEffect} from 'react'

export const ClimateContext = createContext();
export const useClimate = () => useContext(ClimateContext)

export default function ClimateProvider({children}){
  const [temperature, setTemperature] = useState(50);
  const [humidity, setHumidity] = useState(40);

  const [desiredTemperature, setDesiredTemperature] = useState(temperature);
  const [desiredHumidity, setDesiredHumidity] = useState(humidity);

  useEffect( ()=> {
    
    const climatTimeout = setTimeout(() =>{
      if (desiredTemperature > temperature) setTemperature(temperature + 1)
      if (desiredTemperature < temperature) setTemperature(temperature - 1)
      if (desiredHumidity > humidity) setHumidity(humidity + 2)
      if (desiredHumidity < humidity) setHumidity(humidity - 2)
    }, 1000)
  
    return () => clearTimeout(climatTimeout)
  }, [temperature, desiredTemperature, humidity, desiredHumidity])

  return (
  <ClimateContext.Provider
    value = {{
      temperature,
      setTemperature,
      desiredTemperature,
      setDesiredTemperature,

      humidity,
      setHumidity,
      desiredHumidity,
      setDesiredHumidity

    }}
  >
      {children}
  </ClimateContext.Provider>
  )
}
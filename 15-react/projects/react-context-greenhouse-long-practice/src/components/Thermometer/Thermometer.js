import {useState, useEffect} from 'react'
import {useClimate} from '../../context/ClimateContext.js'

import ReactSlider from "react-slider";
import './Thermometer.css';

function Thermometer() {
  const {temperature, setTemperature} = useClimate()
  const{desiredTemperature, setDesiredTemperature} = useClimate()


   return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>
      <ReactSlider
        value={desiredTemperature}
        onAfterChange={(val) => setDesiredTemperature(val)}
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
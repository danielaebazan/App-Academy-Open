import { useState, useEffect } from "react";
import Message from "./components/Message";
import PictureDisplay from "./components/PictureDisplay";

function App() {
  const [size, setSize] = useState('m');
  const [featherCount, setFeatherCount] = useState(0);
  const [featherColors, setFeatherColors] = useState([]);
  const [isRed, setIsRed] = useState(false);
  const [isOrange, setIsOrange] = useState(false);
  const [isBrown, setIsBrown] = useState(false);
  const [isLightBrown, setIsLightBrown] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  const [sizeClass, setSizeClass]=useState('')  
  useEffect(() => {
    let c;    
    switch (size) {
      case 's':
        c = 'small';
        break;
      case 'm':
        c = 'medium';
        break;
      case 'l':
        c = 'large';
        break;
      case 'xl':
        c = 'xlarge';
        break;
    }
    setSizeClass(c)
    console.log('PictureDisplay - size ', size, c);
  }, [size])



  useEffect(() => {
    //console.log('r:',isRed,'/o',isOrange,'/b',isBrown, '/lb',isLightBrown,'/y',isYellow);
    const colors = [];
    if (isRed) colors.push('red');
    if (isOrange) colors.push('orange');
    if (isBrown) colors.push('brown');
    if (isLightBrown) colors.push('light-brown');
    if (isYellow) colors.push('yellow');
    setFeatherColors(colors)      
  
  }, [isRed,isOrange,isBrown,isLightBrown,isYellow])
    

  return (
    <>
      <h1>Turkey Creator</h1>
      <h3 className="button-controls">Set the features of your turkey</h3>

      {/* User controls */}
      <div className="button-controls">
        Size:
        <button onClick={(e) => {setSize('s');  e.currentTarget.disabled = true;}}>Small</button>
        <button onClick={(e) => {setSize('m');  e.currentTarget.disabled = true;}}>Medium</button>
        <button onClick={(e) => {setSize('l');  e.currentTarget.disabled = true;}}>Large</button>
        <button onClick={(e) => {setSize('xl');  e.currentTarget.disabled = true;}}>X-Large</button>
      </div>
      <div className="button-controls">
        Feather Count:
        <input
          type="number"
          onChange={(e) => setFeatherCount(e.currentTarget.value)}
          defaultValue={0}
          min={0}
          max={10}
        />
      </div>
      <div className="button-controls">
        Feather Color(s):
        <label><input
          type="checkbox"
          onChange={(e) => setIsRed(e.currentTarget.checked)}
        />Red</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsOrange(e.currentTarget.checked)}
        />Orange</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsBrown(e.currentTarget.checked)}
        />Brown</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsLightBrown(e.currentTarget.checked)}
        />Light Brown</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsYellow(e.currentTarget.checked)}
        />Golden Yellow</label>
      </div>

      {/* Generated display based on user selections above */}
      <h3 className="button-controls">Enjoy your turkey</h3>
      <PictureDisplay
        sizeClass={sizeClass}
        featherCount={featherCount}
        featherColors={featherColors}
      />
      <Message sizeClass={sizeClass} featherCount={featherCount} />
    </>
  );
}

export default App;
import {Redirect, useHistory} from 'react-router-dom';
function Stocks() {
  let history = useHistory();
  const loggedIn = true;
  if (loggedIn===false) return <Redirect to ='/not-logged-in' />  ;   
  
 
  const handleClick = () => {
    window.alert('Sending info to the DB!');
    console.log('history', history);
    history.push("/");
  };
  return (
    
        <div className='comp orange'>
          <h1>Stocks Component</h1>
          <button onClick={handleClick}>Home</button>
        </div>        
    
  );
      
}

export default Stocks;
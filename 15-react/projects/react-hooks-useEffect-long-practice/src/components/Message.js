import { useEffect, useState } from "react";

function Message({sizeClass, featherCount }) {
  const [message, setMessage] = useState('Oh my! Your bird is naked!')
  useEffect(()=>{

    console.log('Message, sizeClass: ', sizeClass);
  },[sizeClass])

  useEffect(() =>{
    if (featherCount <= 0)
        setMessage('Oh my! Your bird is naked!');
    else if (featherCount >= 10) {
        setMessage('Full turkey!');
    } else {
        setMessage('Coming along...');
    }
}, [featherCount])
  

  return (    
    <div className={`message ${sizeClass}`}>
      {message}
    </div>
  );
};

export default Message;
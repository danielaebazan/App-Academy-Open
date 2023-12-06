import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {writeTweet} from '../store/tweet'
export default function CreateTweet() {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
      const tweet = {
        message
      }

    if (tweet) {
      console.log('posting tweet', tweet );
      dispatch(writeTweet(tweet))
      reset()
    }
  }
  const reset = () => setMessage('');

  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder='Input yout tweet here...'
        value={message}
        onChange = {(e) =>setMessage(e.target.value)}
        name='message'
      >
      </input >&nbsp;
      <button type='submit'>Submit</button>
    </form>
  )
}
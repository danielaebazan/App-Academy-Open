// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_TWEET = 'tweet/addTweet';

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};
const addTweet = (tweet) => {
  return {
    type: ADD_TWEET,
    tweet
  };
};


// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTweets(data));
    return data;
  }
};
export const writeTweet = (payload) => async dispatch => {
  const response = await fetch('/api/tweets', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addTweet(data));
    return data;
  }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET: {
      
      const id = action.tweet.id;
      const newState ={...state, [id]:action.tweet}
      return newState;
    }
    default:
      return state;
  }
};

export default tweetsReducer;
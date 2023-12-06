import produceData from '../mockData/produce.json'

const POPULATE = 'produce/POPULATE';
const TOGGLE_LIKED = 'produce/TOGGLE_LIKED';

// reducer
export default function produceReducer(state = {}, action){
  console.log('firing produceReducer for action: ' + action.type);

  switch (action.type) {
    case POPULATE:{
      const newState = {}
      for (const produce of action.produce) {
        newState[produce.id] = produce;      
      }
      return newState;
    }
    case TOGGLE_LIKED: { // payload = id
      const id = action.payload
      const newLiked = !state[id].liked
      const newProduce = {...state[id], liked:newLiked }    
      return {...state, [id]:newProduce};
    }      

    default:
      return state

  }
}
// action creator
export function populateProduce() {
  console.log('creating action POPULATE');
  
  return {
    type: POPULATE,
    produce: produceData
  }
}
export function toggleLiked(id) {
  console.log('creating action TOGGLE_ID');
  
  return {
    type: TOGGLE_LIKED,
    payload: id
  }
}

// selector functions:
export const getAllProduce = (state) => Object.values(state.produce);
const ADD_TO_CART_ON_ID = '/produce/ADD_TO_CART_ON_ID'
const REMOVE_FROM_CART_ON_ID = '/cart/REMOVE_FROM_CART_ON_ID'
const DECREASE_FROM_CART_ON_ID = '/cart/DECREASE_FROM_CART_ON_ID'
const EMPTY_CART = '/cart/EMPTY_CART'

export default function cardReducer(state = {}, action) {
  console.log('firing cartReducer for action: ' + action.type);
  console.log('state in cardReducer is', state);

  switch (action.type) {
    case ADD_TO_CART_ON_ID: { // also using as increase
      const id = action.payload
      const count = state[id] ? state[id].count + 1 : 1

      const newState = { ...state, [id]: { id: id, count: count } }
      return newState;
    }
    case REMOVE_FROM_CART_ON_ID: {
      const id = action.payload
      const newState = { ...state }
      delete newState[id]
      return newState;
    }
    case DECREASE_FROM_CART_ON_ID: {
      const id = action.payload
      const count = state[id].count - 1
      const newState = { ...state, [id]: { id: id, count: count } }
      return newState;
    }
    case EMPTY_CART: {
      return {};
    }

    default:
      return state
  }
}

// action creators
export const addToCartOnId = id => {
  console.log('creating action ADD_TO_CART_ON_ID');
  return { //action
    type: ADD_TO_CART_ON_ID,
    payload: id
  }
}
export const removeFromCartOnId = id => {
  console.log('creating action REMOVE_FROM_CART_ON_ID');
  return { //action
    type: REMOVE_FROM_CART_ON_ID,
    payload: id
  }
}
export const decreaseFromCartOnId = id => {
  console.log('creating action DECREASE_FROM_CART_ON_ID');
  return { //action
    type: DECREASE_FROM_CART_ON_ID,
    payload: id
  }
}
export const emptyCart = () => {
  console.log('creating action emptyCart');
  return { //action
    type: EMPTY_CART,
    payload: null
  }
}
// use selector functions:
export function getCartItemsWithProduceInfo(state) {
  const cartItemsShort = Object.values(state.cart);
  const produce = state.produce;
  let cartItems = cartItemsShort
    .map(item => {
      return {
        ...item,
        ...produce[item.id]
      };
    });
    console.log('cartItems', cartItems);
  return cartItems
}
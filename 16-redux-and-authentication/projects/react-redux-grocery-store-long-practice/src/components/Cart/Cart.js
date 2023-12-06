import CartItem from './CartItem';
import './Cart.css';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {emptyCart, getCartItemsWithProduceInfo} from '../../store/cart'

function Cart() {
  const dispatch =useDispatch();
  // removing: const cart = useSelector(state => state.cart);
  //        const cartItems = Object.values(cart)
  //         const produce = useSelector(state => state.produce);
  //replacing with useSelector function:
//cartItems
//.map(item => {
//      return {
//        ...item,
//        ...produce[item.id]
//      };
//    });
//    console.log('cartItems', cartItems);
const cartItems = useSelector(getCartItemsWithProduceInfo)

  if (!cartItems || !cartItems.length) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Purchased the following:\n" +
      `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
    dispatch(emptyCart())
  }

  return (
    <div className="cart">      
      <ul>
        {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
      </ul>
      <hr />
      <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  )
}

export default Cart;
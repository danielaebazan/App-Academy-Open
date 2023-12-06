import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {removeFromCartOnId} from '../../store/cart'
import {addToCartOnId} from '../../store/cart'
import {decreaseFromCartOnId} from '../../store/cart'

function CartItem({item}) {
  const dispatch= useDispatch()
  console.log('item from CartItem: ', item);
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <li className="cart-item">
      <div className="cart-item-header">{item.name}</div>

      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          readOnly
        />
        <button
          className="cart-item-button"
          onClick={()=> dispatch(addToCartOnId(item.id))}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={()=> {
              dispatch(decreaseFromCartOnId(item.id))
              console.log('COUNT', item.count);
              if (item.count <= 1) { //<=1 not <1 because last dispatch not seen here
                dispatch(removeFromCartOnId(item.id))
              }
            }
          }
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={()=> dispatch(removeFromCartOnId(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
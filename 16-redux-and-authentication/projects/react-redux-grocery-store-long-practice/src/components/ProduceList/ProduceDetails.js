import {useDispatch} from 'react-redux'
import {addToCartOnId} from '../../store/cart'
import {toggleLiked} from '../../store/produce'
function ProduceDetails({ produce }) {
  const cartItem = {};
  const dispatch = useDispatch()

  return (
    <li className="produce-details">
      <span>{produce.name}</span>
      <span>
        <button
          className={"like-button" + (produce.liked ? " selected" : "")}
          onClick={()=> dispatch(toggleLiked(produce.id))}
        >
          <i className={"fas fa-heart"} />
        </button>
        <button
          className={"plus-button" + (cartItem ? " selected" : "")}
          onClick={()=> dispatch(addToCartOnId(produce.id))}
        >
          <i className="fas fa-plus" />
        </button>
      </span>
    </li>
  );
}

export default ProduceDetails;
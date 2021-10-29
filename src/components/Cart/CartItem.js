import classes from './CartItem.module.css';
import Button from './../UI/Button';
import MinusIcon from './../../assets/MinusIcon';
import PlusIcon from './../../assets/PlusIcon';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
      
        <Button onClick={props.onRemove} className={classes.button} variant="primary-outline">
        
         <MinusIcon/>
        </Button>
        <Button onClick={props.onAdd} className={classes.button} variant="primary-outline">
         <PlusIcon/>
        </Button>
      </div>
    </li>
  );
};

export default CartItem;
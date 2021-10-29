import React, { useContext } from "react";
import Modal from "./../UI/Modal";
import CartContext from "./../../store/Cart-context";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";
import classes from "./Cart.module.css";
import Button from "./../UI/Button";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [totalAmountChanges, setTotalAmountChanges] = React.useState(false);
  const totalAmountClasses = totalAmountChanges ? classes.focusInExpand : "";
  const [isCheckout, setIsCheckout] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [didSubmit, setDidSubmit] = React.useState(false);
  const [submittingMassage, setSubmittingMassage] = React.useState("");

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItem = cartCtx.items.length > 0;

  React.useEffect(() => {
    setTotalAmountChanges(true);
    const timer = setTimeout(() => {
      setTotalAmountChanges(false);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmount]);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    if (cartCtx.items.length > 0) {
      setIsSubmitting(true);
      await fetch(
        "https://react-http-974d2-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );
      setIsSubmitting(false);
      setDidSubmit(true);
      setSubmittingMassage("successfully ordered sent ...");
    } else {
      setSubmittingMassage("you should choose something to order!");
      setIsCheckout(false);
      setDidSubmit(false);
      return;
    }
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <Button
        className={classes["button-alt"]}
        onClick={props.onHideCart}
        variant="primary-outline"
      >
        close
      </Button>
      {hasItem && (
        <Button className={classes.button} onClick={orderHandler}>
          order
        </Button>
      )}
    </div>
  );

  const cardModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span className={totalAmountClasses}>{totalAmount}</span>
      </div>
      {isCheckout ? (
        <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler} />
      ) : (
        modalActions
      )}
    </>
  );

  const isSubmittingModalContent = <h3>sending order data ...</h3>;
  const didSubmitModalContent = (
    <>
      <h3>{submittingMassage}</h3>
      <div className={classes.actions}>
        <Button className={classes["button-alt"]} onClick={props.onHideCart}>
          close
        </Button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {!isSubmitting && !didSubmit && !submittingMassage && cardModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!didSubmit && submittingMassage && didSubmitModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;

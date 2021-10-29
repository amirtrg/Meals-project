import React, { useRef, useState } from "react";

import classes from "./CheckOut.module.css";
import Button from "./../UI/Button";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length == 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {

      return;
    } else {
        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            city:enteredCity,
            postalCode:enteredPostal
        });
    }
  };

  return (
      <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputValidity.name?"":classes.invalid}`}>
        <label htmlFor="name">your name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>please enter valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.street?"":classes.invalid}`}>
        <label htmlFor="street">street</label>
        <input type="text" id="street" ref={streetInputRef} />
        
        {!formInputValidity.street && <p>please enter valid street name!</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.postalCode?"":classes.invalid}`}>
        <label htmlFor="postal">postal code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        
        {!formInputValidity.postalCode && <p>please enter valid postal code! (5 character long)</p>}
      </div>
      <div className={`${classes.control} ${formInputValidity.city?"":classes.invalid}`}>
        <label htmlFor="city">city</label>
        <input type="text" id="city" ref={cityInputRef} />
        
        {!formInputValidity.city && <p>please enter valid city name!</p>}
      </div>
      <div className={classes.actions}>
        <Button
          variant="primary-outline"
          type="button"
          onClick={props.onCancel}
        >
          cancel
        </Button>
        <Button>confirm</Button>
      </div>
    </form>
  );
};

export default Checkout;

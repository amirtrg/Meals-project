import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "./../../UI/Input";
import Modal from "./../../UI/Modal";
import Button from './../../UI/Button';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCard(enteredAmountNumber);
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="amount"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Button>Add</Button>
      {!amountIsValid && (
        <Modal
          onClose={() => {
            setAmountIsValid(true);
          }}
        >
          <h3
          style={{padding:"1rem 0"}}
          > please enter a valid amount from 1 to 5.</h3>
          <Button
            onClick={() => {
              setAmountIsValid(true);
            }}
          >
            ok
          </Button>
        </Modal>
      )}
    </form>
  );
};

export default MealItemForm;

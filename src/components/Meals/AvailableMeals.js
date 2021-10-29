import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "./../UI/Card";
import MealItem from "./MealItem/MealItem";
import ChevronUp from "./../../assets/ChevronUp";
import Button from './../UI/Button';

const goUpHandler = () => {
  if (window.innerWidth < 800) {
    window.scrollTo(0, 580);
  }
  if (window.innerWidth < 600) {
    window.scrollTo(0, 700);
  }
  if (window.innerWidth < 400) {
    window.scrollTo(0, 550);
  } else {
    window.scrollTo(0, 640);
  }
};

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError,setHttpError]=useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)
      const response = await fetch(
        "https://react-http-974d2-default-rtdb.firebaseio.com/meal.json"
      );
      if(!response.ok){
        throw new Error("something went wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setIsLoading(false)
      setMeals(loadedMeals);
    };

      fetchMeals().catch((error)=>{

        setIsLoading(false)
        setHttpError(error.message)
      });
  }, []);

 
  if(isLoading){
    return (
      <section>
  <h2 className={classes.loading}>loading</h2>
      </section>
    )
  }
  if(httpError){
    return(
      <section>
      <h2 className={classes.error}>{httpError}</h2>
          </section>
    )
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
      <Button onClick={goUpHandler} className={classes.button} variant="circle">
        <span>
          <ChevronUp />
        </span>
      </Button>
    </section>
  );
};

export default AvailableMeals;

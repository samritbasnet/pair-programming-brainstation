import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function RecipieCard() {
  const [meal, setMeal] = useState(null);
  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3003/random-meal');
        setMeal(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRandomRecipe();
  }, []);
  if (!meal) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{meal.strMeal} </h1>
      <img src={meal.strMealThumb} />
      <ul>
        {Object.keys(meal)
          .filter((key) => key.startsWith('strMeasure') && meal[key])
          .map((key) => (
            <li key={key}>{meal[key]}</li>
          ))}
      </ul>
    </>
  );
}

export default RecipieCard;

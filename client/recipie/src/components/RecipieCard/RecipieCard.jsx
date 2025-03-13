import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipieCard.scss';

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
    <div className="meal-container">
      <h1 className="meal-title">{meal.strMeal}</h1>
      <img className="meal-image" src={meal.strMealThumb} alt={meal.strMeal} />
      <ul className="meal-list">
        {Object.keys(meal)
          .filter((key) => key.startsWith('strMeasure') && meal[key])
          .map((key) => (
            <li key={key} className="meal-item">
              {meal[key]}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RecipieCard;

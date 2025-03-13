import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipieCard.scss';

function RecipieCard() {
  const [meal, setMeal] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

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

  const saveRecipe = async () => {
    if (!meal) return;
    if (savedRecipes.some(savedMeal => savedMeal.idMeal === meal.idMeal)) {
      alert("duplicated recipe");
      return;
    }
    try {
      await axios.post('http://localhost:3003/save', meal, {});
      setSavedRecipes([...savedRecipes, meal]); 
    } catch (error) {
      console.error(error);
    }
  };

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div className="meal-container">
      <h1 className="meal-container__title">{meal.strMeal}</h1>

      <img className="meal-container__image" src={meal.strMealThumb} alt={meal.strMeal} />

      <ul className="meal-container__list">
        {Object.keys(meal)
          .filter((key) => key.startsWith('strIngredient') && meal[key])
          .map((key, index) => {
            const measureKey = `strMeasure${index + 1}`;
            return (
              <li key={key} className="ingredients">
                {meal[measureKey] && meal[measureKey] ? `${meal[measureKey]} ` : ''} 
                {meal[key]}
              </li>
            );
          })}
      </ul>

      <p className="instructions">{meal.strInstructions}</p>

      <button className="save-button" onClick={saveRecipe}>
        Save Recipe
      </button>

    </div>
  );
}

export default RecipieCard;

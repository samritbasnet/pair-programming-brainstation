import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipieCard.scss';

function RecipieCard() {
  const [meal, setMeal] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);


  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3005/random-meal');
        setMeal(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random recipe:', error);
        setLoading(false);
      }
    };
    fetchRandomRecipe();
  }, []);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3005/save');
        setSavedRecipes(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async () => {
    if (!meal) return;


    const isDuplicate = savedRecipes.some(
      (savedMeal) => savedMeal && savedMeal.idMeal === meal.idMeal
    );

    if (isDuplicate) {
      alert('This recipe is already saved!');
      return;
    }

    try {
      await axios.post('http://localhost:3005/save', meal);
      setSavedRecipes([...savedRecipes, meal]);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000); 
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
  };

  const getNewRecipe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3005/random-meal');
      setMeal(response.data);
      setLoading(false);
      setSaveSuccess(false);
    } catch (error) {
      console.error('Error fetching new recipe:', error);
      setLoading(false);
    }
  };

  if (loading || !meal) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="meal-container">
      <h1 className="meal-container__title">{meal.strMeal}</h1>

      <img className="meal-container__image" src={meal.strMealThumb} alt={meal.strMeal} />

      <div className="meal-container__category">
        <span>Category: {meal.strCategory}</span>
        {meal.strArea && <span> • Area: {meal.strArea}</span>}
      </div>

      <h3>Ingredients:</h3>
      <ul className="meal-container__list">
        {Object.keys(meal)
          .filter((key) => key.startsWith('strIngredient') && meal[key])
          .map((key, index) => {
            const ingredientNum = key.slice(13);
            const measureKey = `strMeasure${ingredientNum}`;
            return (
              <li key={key} className="ingredients">
                {meal[measureKey] ? `${meal[measureKey]} ` : ''}
                {meal[key]}
              </li>
            );
          })}
      </ul>

      <h3>Instructions:</h3>
      <p className="instructions">{meal.strInstructions}</p>

      <div className="button-container">
        <button className="save-button" onClick={saveRecipe} disabled={saveSuccess}>
          {saveSuccess ? 'Recipe Saved!' : 'Save Recipe'}
        </button>
        <button className="new-recipe-button" onClick={getNewRecipe}>
          Get New Recipe
        </button>
      </div>

      {saveSuccess && <p className="save-success">Recipe saved successfully!</p>}
    </div>
  );
}

export default RecipieCard;

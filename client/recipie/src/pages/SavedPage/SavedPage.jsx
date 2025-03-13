import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import './SavedPage.scss';

function SavedPage() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3005/save');
        setSavedRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
        setError('Failed to load saved recipes. Please try again later.');
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <>
      <Header />
      <div className="saved-recipe-container">
        <h2>Saved Recipes</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && savedRecipes.length === 0 && <p>No saved recipes found.</p>}

        {!loading && !error && savedRecipes.length > 0 && (
          <div className="saved-recipes-list">
            {Array.isArray(savedRecipes) ? (
              savedRecipes.map((recipe, index) => (
                <div key={index} className="saved-recipe-card">
                  <h3>{recipe.title || 'Untitled Recipe'}</h3>
                  <pre>{JSON.stringify(recipe, null, 2)}</pre>
                </div>
              ))
            ) : (
              <div className="saved-recipe-card">
                <h3>{savedRecipes.title || 'Saved Recipe'}</h3>
                <pre>{JSON.stringify(savedRecipes, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default SavedPage;

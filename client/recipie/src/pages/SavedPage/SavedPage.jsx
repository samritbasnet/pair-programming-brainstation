import React from 'react';
import Header from '../../components/Header/Header';
import axios from 'axios';
import { useEffect } from 'react';
import './SavedPage.scss';

function SavedPage() {
  const [savedRecipe, setSavedRecipe] = useState(null);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3005/save');
        setSavedRecipe(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchSavedRecipe();
  }, []);

  function SavedPage() {
    return (
      <>
        <Header />
        <div className="saved-recipe-container">
          <h2>Saved Recipe</h2>
          {savedRecipe ? <pre>{JSON.stringify(savedRecipe, null, 2)}</pre> : <p>Loading...</p>}
        </div>
      </>
    );
  }
}
export default SavedPage;

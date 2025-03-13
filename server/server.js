import express from 'express';
import axios from 'axios';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3003;



app.use(cors());
app.get('/random-meal', async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    res.status(200).send("succesfull");
    const meal = response.data.meals[0];
    res.json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch a meal' });
  }
})

app.post('/save-recipe', (req, res) => {
  try {
    const recipe = req.body;
    

    const savedRecipes = JSON.parse(fs.readFileSync(SAVED_RECIPES_FILE));
    

    const exists = savedRecipes.some(item => item.idMeal === recipe.idMeal);
    
    if (!exists) {
      
      savedRecipes.push(recipe);
            
      fs.writeFileSync(SAVED_RECIPES_FILE, JSON.stringify(savedRecipes));
      
      res.status(201).json({ message: 'Recipe saved successfully' });
    } else {
      res.status(200).json({ message: 'Recipe already saved' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

app.post('')
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

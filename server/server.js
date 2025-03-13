import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3003;
app.use(cors());
app.get('/random-meal', async (req, res) => {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = response.data.meals[0];
    res.json(meal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch a meal' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import axios from 'axios';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/recipie', (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Recipe file not found' });
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing recipe file:', error);
    res.status(500).json({ message: 'Error retrieving recipe' });
  }
});

const PORT = process.env.PORT || 3005;

const filePath = path.join(__dirname, 'recipie.json');

app.use(express.json());

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

app.get('/save', (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Recipe file not found' });
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing recipe file:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

app.post('/save', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'recipie.json');
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return res.status(500).json({ message: 'Error saving data' });
    }
    res.status(200).json({ message: 'Data saved successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());

const PORT = process.env.POR ?? 8080;

import recipieRoute from './routes/recipie.js';
app.use('/recipie', recipieRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

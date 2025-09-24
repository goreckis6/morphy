import express from 'express';
import conversionRouter from './api/convert';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', conversionRouter);

app.get('/', (_req, res) => {
  res.send('Conversion API running');
});

app.listen(PORT, () => {
  console.log(`Conversion server running on port ${PORT}`);
});

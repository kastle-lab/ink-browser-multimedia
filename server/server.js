import express from 'express';
import cors from 'cors';
import ocrRoutes from './routes/ocrRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', ocrRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

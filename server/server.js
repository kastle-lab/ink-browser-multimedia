import express from 'express';
import cors from 'cors';
import ocrRoutes from './routes/ocrRoutes.js';

const app = express();

// Enable CORS so frontend (React app) can make requests to this server
app.use(cors());

// Middleware to automatically parse incoming JSON request bodies
app.use(express.json());

// Mount all OCR routes under the "/api" path
// Example: if ocrRoutes defines "/ocr", then the full path becomes "/api/ocr"
app.use('/api', ocrRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

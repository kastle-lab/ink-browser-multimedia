import express from 'express';
import { processOcrRequest } from '../controllers/ocrController.js';

const router = express.Router();

router.post('/ocrTopics', processOcrRequest);

export default router;

import { Router } from 'express';
import { postErrorInfo, getHighMisrecognitionSigns } from './error.controller.js';
import authenticateToken from '../../config/jwt.middleware.js';

const router = Router();

router.post('/info', postErrorInfo);
router.get('/traffic', authenticateToken, getHighMisrecognitionSigns); // GET 요청 추가

export default router;

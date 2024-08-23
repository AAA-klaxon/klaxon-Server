import { Router } from 'express';
import { getTopErrorProneSigns } from './error.controller.js';

const router = Router();

router.get('/', getTopErrorProneSigns);

export default router;

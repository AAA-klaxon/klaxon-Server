// srcs/user/user.route.js
import { Router } from 'express';
import { signup, getUserInfo } from './user.controller.js';

const router = Router();

router.post('/signup', signup);
router.get('/info', getUserInfo); // 사용자 정보 조회 엔드포인트 추가

export default router;
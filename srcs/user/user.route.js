// srcs/user/user.route.js
import { Router } from 'express';
import { getUserInfo, updateNickname, deleteUser, logout } from './user.controller.js';
import authenticateToken from '../../config/jwt.middleware.js';

const router = Router();

router.use(authenticateToken);

router.post('/info', getUserInfo);
router.patch('/info/nickname', updateNickname);
router.delete('/', deleteUser);
router.post('/logout', logout);

export default router;

// srcs/user/user.route.js
import { Router } from 'express';
import { signup, getUserInfo, updateNickname, deleteUser, getNotices } from './user.controller.js';

const router = Router();

router.post('/signup', signup);
router.get('/info', getUserInfo);
router.patch('/info/nickname', updateNickname);
router.delete('/', deleteUser);
router.get('/notice', getNotices);

export default router;

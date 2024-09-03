// srcs/user/user.route.js
import { Router } from 'express';
import { getUserInfo, updateNickname, deleteUser } from './user.controller.js';

const router = Router();

router.get('/info', getUserInfo);
router.patch('/info/nickname', updateNickname);
router.delete('/', deleteUser);
// router.get('/notice', getNotices);

export default router;

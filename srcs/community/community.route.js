import { Router } from 'express';
import authenticateToken from '../../config/jwt.middleware.js';
import {
  listPosts,
  createPost,
  getPost,
  createComment,
  getComments,
  likePost,
  unlikePost
} from './community.controller.js';

const router = Router();

router.use(authenticateToken);

router.get('/posts', listPosts); // 게시글 리스트 조회
router.post('/posts', createPost); // 게시글 작성
router.get('/posts/:postId', getPost); // 게시글 조회
router.post('/posts/:postId/comments', createComment); // 댓글 작성
router.get('/posts/:postId/comments', getComments); // 댓글 조회
router.post('/posts/:postId/likes', likePost); // 좋아요
router.delete('/posts/:postId/likes', unlikePost); // 좋아요 취소

export default router;

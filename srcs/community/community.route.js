import { Router } from 'express';
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

// 게시글 리스트 조회
router.get('/posts', listPosts);

// 게시글 작성
router.post('/posts', createPost);

// 게시글 조회
router.get('/posts/:postId', getPost);

// 댓글 작성
router.post('/posts/:postId/comments', createComment);

// 특정 게시물의 모든 댓글 조회
router.get('/posts/:postId/comments', getComments);


// 게시물 좋아요
router.post('/posts/:postId/likes', likePost);

// 게시물 좋아요 취소
router.delete('/posts/:postId/likes', unlikePost); 

export default router;

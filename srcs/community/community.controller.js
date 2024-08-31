// srcs/community/community.controller.js
import * as communityService from './community.service.js';
import { response } from '../../config/response.js';

// 공통 오류 핸들러
function handleError(res, error) {
  res.status(500).json(response({ isSuccess: false, code: 500, message: error.message }, null));
}

// 게시글 리스트 조회
export async function listPosts(req, res) {
  try {
    const posts = await communityService.listPosts(req.headers['user_id']);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시글을 성공적으로 조회했습니다.' }, posts));
  } catch (error) {
    handleError(res, error);
  }
}

// 게시글 작성
export async function createPost(req, res) {
  try {
    const post = await communityService.createPost(req.body, req.headers['user_id']);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '게시글을 성공적으로 작성했습니다.' }, post));
  } catch (error) {
    handleError(res, error);
  }
}

// 게시글 조회
export async function getPost(req, res) {
  try {
    const post = await communityService.getPost(req.params.postId, req.headers['user_id']);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시글을 성공적으로 조회했습니다.' }, post));
  } catch (error) {
    handleError(res, error);
  }
}

// 댓글 작성
export async function createComment(req, res) {
  try {
    const comment = await communityService.createComment(req.params.postId, req.body, req.headers['user_id']);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '댓글을 성공적으로 작성했습니다.' }, comment));
  } catch (error) {
    handleError(res, error);
  }
}

// 댓글 리스트 조회
export async function getComments(req, res) {
  try {
    const comments = await communityService.getComments(req.params.postId, req.headers['user_id']);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '댓글을 성공적으로 조회했습니다.' }, comments));
  } catch (error) {
    handleError(res, error);
  }
}

// 게시물 좋아요
export async function likePost(req, res) {
  try {
    await communityService.likePost(req.params.postId, req.headers['user_id']);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '게시물에 좋아요를 추가했습니다.' }, null));
  } catch (error) {
    handleError(res, error);
  }
}

// 게시물 좋아요 취소
export async function unlikePost(req, res) {
  try {
    await communityService.unlikePost(req.params.postId, req.headers['user_id']);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시물 좋아요가 취소되었습니다.' }, null));
  } catch (error) {
    handleError(res, error);
  }
}

// srcs/community/community.controller.js
import * as communityService from './community.service.js';
import { response } from '../../config/response.js';

// 게시글 리스트 조회
export async function listPosts(req, res) {
  try {
    const posts = await communityService.listPosts(req.user_id);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시글을 성공적으로 조회했습니다.' }, posts));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: '게시글 리스트 조회 중 오류가 발생했습니다.' }, null));
  }
}

// 게시글 작성
export async function createPost(req, res) {
  try {
    const post = await communityService.createPost(req.body, req.user_id);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '게시글을 성공적으로 작성했습니다.' }, post));
  } catch (error) {
    res.status(400).json(response({ isSuccess: false, code: 400, message: '게시글 작성 중 오류가 발생했습니다.' }, null));
  }
}

// 게시글 조회
export async function getPost(req, res) {
  try {
    const post = await communityService.getPost(req.params.postId, req.user_id);
    if (!post) {
      return res.status(404).json(response({ isSuccess: false, code: 404, message: '게시글을 찾을 수 없습니다.' }, null));
    }
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시글을 성공적으로 조회했습니다.' }, post));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: '게시글 조회 중 오류가 발생했습니다.' }, null));
  }
}

// 댓글 작성
export async function createComment(req, res) {
  try {
    const comment = await communityService.createComment(req.params.postId, req.body, req.user_id);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '댓글을 성공적으로 작성했습니다.' }, comment));
  } catch (error) {
    res.status(400).json(response({ isSuccess: false, code: 400, message: '댓글 작성 중 오류가 발생했습니다.' }, null));
  }
}

// 댓글 리스트 조회
export async function getComments(req, res) {
  try {
    const comments = await communityService.getComments(req.params.postId, req.user_id);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '댓글을 성공적으로 조회했습니다.' }, comments));
  } catch (error) {
    res.status(500).json(response({ isSuccess: false, code: 500, message: '댓글 조회 중 오류가 발생했습니다.' }, null));
  }
}

// 게시물 좋아요
export async function likePost(req, res) {
  try {
    const likeResponse = await communityService.likePost(req.params.postId, req.user_id);
    res.status(201).json(response({ isSuccess: true, code: 201, message: '게시물에 좋아요를 추가했습니다.' }, likeResponse));
  } catch (error) {
    res.status(400).json(response({ isSuccess: false, code: 400, message: '게시물 좋아요 중 오류가 발생했습니다.' }));
  }
}

// 게시물 좋아요 취소
export async function unlikePost(req, res) {
  try {
    const likeResponse = await communityService.unlikePost(req.params.postId, req.user_id);
    res.status(200).json(response({ isSuccess: true, code: 200, message: '게시물 좋아요가 취소되었습니다.' }, likeResponse));
  } catch (error) {
    res.status(400).json(response({ isSuccess: false, code: 400, message: '게시물 좋아요 취소 중 오류가 발생했습니다.' }));
  }
}


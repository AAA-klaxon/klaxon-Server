// srcs/community/community.service.js
import * as communityModel from './community.model.js';
import { getPostDTO, writePostDTO, CommentDTO } from './community.dto.js';

// 게시글 리스트 조회
export async function listPosts(userId) {
  const posts = await communityModel.getPosts();
  return posts.map(post => new getPostDTO(post)); // getPostDTO 사용
}

// 게시글 작성
export async function createPost({ title, main_text }, userId) {
  const postId = await communityModel.createPost(userId, title, main_text);
  const post = await communityModel.getPost(postId);
  return new writePostDTO(post); // writePostDTO 사용
}

// 게시글 조회
export async function getPost(postId, userId) {
  const post = await communityModel.getPost(postId);
  return new getPostDTO(post); // getPostDTO 사용
}

// 댓글 작성
export async function createComment(postId, { text }, userId) {
  const commentId = await communityModel.createComment(postId, userId, text);
  const comment = await communityModel.getComment(postId, commentId);
  return new CommentDTO(comment);
}

// 특정 게시물의 모든 댓글 조회
export async function getComments(postId, userId) {
  const comments = await communityModel.getComments(postId);
  return comments.map(comment => new CommentDTO(comment));
}

// 게시물 좋아요
export async function likePost(postId, userId) {
  await communityModel.addLike(postId, userId);
  const likeCount = await communityModel.getLikeCount(postId); // 추가: 좋아요 수 조회
  return new LikeResponseDTO(likeCount); // DTO 반환
}

// 게시물 좋아요 취소
export async function unlikePost(postId, userId) {
  await communityModel.removeLike(postId, userId);
  const likeCount = await communityModel.getLikeCount(postId); // 추가: 좋아요 수 조회
  return new LikeResponseDTO(likeCount); // DTO 반환
}

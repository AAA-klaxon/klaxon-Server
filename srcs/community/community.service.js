// srcs/community/community.service.js
import * as communityModel from './community.model.js';
import { getPostDTO, writePostDTO, CommentDTO, LikeResponseDTO } from './community.dto.js';

// 게시글 리스트 조회
export async function listPosts(userId) {
  const posts = await communityModel.getPosts(userId);
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
  const post = await communityModel.getPost(postId, userId);
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


export async function likePost(postId, userId) {
  try {
    console.log("Attempting to like post:", postId, "User ID:", userId);
    await communityModel.addLike(postId, userId);
    const likeCount = await communityModel.getLikeCount(postId);
    console.log("Updated like count after like:", likeCount);
    return new LikeResponseDTO(likeCount);
  } catch (error) {
    console.error("Error in likePost function:", error.message);
    throw error;

}

}

// 게시물 좋아요 취소
export async function unlikePost(postId, userId) {
  try {
    console.log("Removing like from post:", postId, "by user:", userId); // 로그 추가
    await communityModel.removeLike(postId, userId);
    const likeCount = await communityModel.getLikeCount(postId);
    console.log("Updated like count after unlike:", likeCount); // 로그 추가
    return new LikeResponseDTO(likeCount);
  } catch (error) {
    console.error("Error in service unlikePost:", error); // 로그 추가
    throw error;
  }
}
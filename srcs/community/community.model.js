// srcs/community/community.model.js
import pool from '../../config/db.js';
import { 
  GET_POSTS_QUERY, 
  CREATE_POST_QUERY, 
  GET_POST_QUERY,
  CREATE_COMMENT_QUERY,
  GET_COMMENT_QUERY,
  ADD_LIKE_QUERY,
  REMOVE_LIKE_QUERY
} from './community.sql.js';

// 게시글 리스트 조회
export async function getPosts(userId) {
  const [rows] = await pool.query(GET_POSTS_QUERY);
  return rows;
}

// 게시글 작성
export async function createPost(userId, title, main_text) {
  const [result] = await pool.query(CREATE_POST_QUERY, [userId, title, main_text]);
  return result.insertId;
}

// 게시글 조회
export async function getPost(postId, userId) {
  const [rows] = await pool.query(GET_POST_QUERY, [postId]);
  return rows[0];
}

// 댓글 작성
export async function createComment(postId, userId, text) {
  const [result] = await pool.query(CREATE_COMMENT_QUERY, [postId, userId, text]);
  return result.insertId;
}

// 특정 게시물의 모든 댓글 조회
export async function getComments(postId, userId) {
  const [rows] = await pool.query('SELECT * FROM COMMENT WHERE post_id = ? ORDER BY created_at DESC', [postId]);
  return rows;
}

// 특정 댓글 조회
export async function getComment(postId, commentId) {
  const [rows] = await pool.query('SELECT * FROM COMMENT WHERE post_id = ? AND comment_id = ?', [postId, commentId]);
  return rows[0];
}

// 게시물 좋아요 추가
export async function addLike(postId, userId) {
  await pool.query(ADD_LIKE_QUERY, [postId, userId]);
}

// 게시물 좋아요 제거
export async function removeLike(postId, userId) {
  await pool.query(REMOVE_LIKE_QUERY, [postId, userId]);
}

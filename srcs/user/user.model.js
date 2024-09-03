// srcs/user/user.model.js
import pool from '../../config/db.js';
import { 
  GET_USER_INFO_QUERY, 
  UPDATE_USER_NICKNAME_QUERY,
  DELETE_USER_QUERY,
} from './user.sql.js';

async function getUserInfo(userId) {
  const [rows] = await pool.query(GET_USER_INFO_QUERY, [userId]);
  return rows[0];
}

async function updateUserNickname(userId, newNickname) {
  const [result] = await pool.query(UPDATE_USER_NICKNAME_QUERY, [newNickname, userId]);
  return result;
}

async function deleteUser(userId) {
  const [result] = await pool.query(DELETE_USER_QUERY, [userId]);
  return result;
}

// async function getNotices() {
//   try {
//     const [rows] = await pool.query(GET_NOTICES_QUERY);
//     return rows;
//   } catch (error) {
//     console.error('공지사항 조회 중 오류 발생:', error);
//     throw error;
//   }
// }


export { 
  getUserInfo, 
  updateUserNickname,
  deleteUser,
};

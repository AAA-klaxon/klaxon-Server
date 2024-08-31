// srcs/user/user.model.js
import pool from '../../config/db.js';
import { 
  CREATE_USER_QUERY, 
  GET_USER_INFO_QUERY, 
  GET_USER_BY_EMAIL_QUERY,
  GET_USER_BY_CAR_NUMBER_QUERY,
  GET_USER_BY_NICKNAME_QUERY,
  GET_USER_BY_PASSWORD_QUERY,
  UPDATE_USER_NICKNAME_QUERY,
  DELETE_USER_QUERY,
  GET_NOTICES_QUERY
} from './user.sql.js';

async function getUserByEmail(email) {
  const [rows] = await pool.query(GET_USER_BY_EMAIL_QUERY, [email]);
  return rows[0];
}

async function getUserByCarNumber(car_number) {
  const [rows] = await pool.query(GET_USER_BY_CAR_NUMBER_QUERY, [car_number]);
  return rows[0];
}

async function getUserByNickname(nickname) {
  const [rows] = await pool.query(GET_USER_BY_NICKNAME_QUERY, [nickname]);
  return rows[0];
}

async function getUserByPassword(password) {
  const [rows] = await pool.query(GET_USER_BY_PASSWORD_QUERY, [password]);
  return rows[0];
}

async function createUser(userDTO) {
  const { email, password, nickname, car_number } = userDTO;
  const [result] = await pool.query(CREATE_USER_QUERY, [email, password, nickname, car_number]);
  return result;
}

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
  createUser, 
  getUserInfo, 
  getUserByEmail,
  getUserByCarNumber,
  getUserByNickname,
  getUserByPassword,
  updateUserNickname,
  deleteUser,
};

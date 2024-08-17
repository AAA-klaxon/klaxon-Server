// srcs/user/user.model.js
import db from '../../config/db.js';
import { CREATE_USER_QUERY, GET_USER_INFO_QUERY } from './user.sql.js';

async function createUser(userDTO) {
  const { email, password, nickname, car_number } = userDTO;
  const [result] = await db.execute(CREATE_USER_QUERY, [email, password, nickname, car_number]);
  return result[0];
}

async function getUserInfo(userId) {
  const [rows] = await db.execute(GET_USER_INFO_QUERY, [userId]);
  return rows[0]; // 단일 사용자 정보를 반환하는 경우
}

export { createUser, getUserInfo };

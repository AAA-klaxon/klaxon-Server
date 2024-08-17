// srcs/user/user.service.js
import { createUser, getUserInfo } from './user.model.js';
import UserDTO from './user.dto.js';

export async function createUser(userDTO) {
  return UserModel.createUser(userDTO);
}

export async function getUserInfo(userId) {
  return UserModel.getUserInfo(userId);
}

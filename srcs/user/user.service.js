// srcs/user/user.service.js
import { 
  createUser as createUserInModel, 
  getUserInfo as getUserInfoFromModel, 
  getUserByEmail,
  getUserByCarNumber,
  getUserByNickname,
  getUserByPassword,
  updateUserNickname,  
  deleteUser as deleteUserInModel,
  getNotices as getNoticesInModel
} from './user.model.js';

export async function createUser(userDTO) {
  const { email, car_number, nickname, password } = userDTO;

  // 이메일 중복 확인
  const existingUserByEmail = await getUserByEmail(email);
  if (existingUserByEmail) {
    throw new Error('이미 등록된 이메일입니다.');
  }

  // 차량 번호 중복 확인
  const existingUserByCarNumber = await getUserByCarNumber(car_number);
  if (existingUserByCarNumber) {
    throw new Error('이미 등록된 차량 번호입니다.');
  }

  // 닉네임 중복 확인
  const existingUserByNickname = await getUserByNickname(nickname);
  if (existingUserByNickname) {
    throw new Error('이미 등록된 닉네임입니다.');
  }

  // 비밀번호 중복 확인
  const existingPasswordUser = await getUserByPassword(password);
  if (existingPasswordUser) {
    throw new Error('이미 등록된 비밀번호입니다.');
  }

  return createUserInModel(userDTO);
}

export async function getUserInfo(userId) {
  const userInfo = await getUserInfoFromModel(userId);
  if (!userInfo) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  return userInfo;
}

export async function updateNickname(userId, newNickname) {
  const existingUserByNickname = await getUserByNickname(newNickname);
  if (existingUserByNickname) {
    throw new Error('이미 등록된 닉네임입니다.');
  }

  await updateUserNickname(userId, newNickname);
  return { userId, newNickname };
}

export async function deleteUser(userId) {
  return deleteUserInModel(userId);
}

export async function getNotices() {
  try {
    const notices = await getNoticesInModel();
    return notices;
  } catch (error) {
    console.error('공지사항 조회 중 오류 발생:', error);
    throw error; 
  }
}
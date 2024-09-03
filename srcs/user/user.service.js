// srcs/user/user.service.js
import { 
  getUserInfo as getUserInfoFromModel, 
  updateUserNickname,  
  deleteUser as deleteUserInModel,
} from './user.model.js';


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

// export async function getNotices() {
//   try {
//     const notices = await getNoticesInModel();
//     return notices;
//   } catch (error) {
//     console.error('공지사항 조회 중 오류 발생:', error);
//     throw error; 
//   }
// }
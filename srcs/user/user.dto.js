// srcs/user/user.dto.js

export const userInfoDTO = (userInfo) => ({
  user_id: userInfo.user_id,
  email: userInfo.email,
  nickname: userInfo.nickname,
  car_number: userInfo.car_number,
});

export const updateNicknameResponseDTO = (user) => ({
  user_id: user.user_id,
  nickname: user.nickname
});

export const errorDTO = (message) => ({
  message
});

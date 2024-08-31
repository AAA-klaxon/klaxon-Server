// srcs/user/user.controller.js
import * as UserService from './user.service.js';
import { response } from '../../config/response.js';

export async function signup(req, res) {
  try {
    const { email, password, nickname, car_number } = req.body;

    if (!email || !password || !nickname || !car_number) {
      return res.status(400).json(response(
        {
        isSuccess: false,
        code: 400,
        message: '모든 필드가 필요합니다.',      
      }
    ));
    }

    try {
      const newUser = await UserService.createUser({ email, password, nickname, car_number });
      res.status(201).json(response({
        isSuccess: true,
        code: 201,
        message: '사용자가 성공적으로 가입되었습니다.',
      } ));
    } catch (error) {
      if (error.message.includes('이미 등록된 이메일') || 
          error.message.includes('이미 등록된 차량 번호') ||
          error.message.includes('이미 등록된 닉네임')) {
        return res.status(409).json(response({
          isSuccess: false,
          code: 409,
          message: error.message,
          result: {} 
        }));
      }
      throw error; // 다른 에러는 다시 던져서 아래의 catch 블록에서 처리
    }
  } catch (error) {
    console.error('가입 중 오류 발생:', error);
    res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
    }));
  }
}

export async function getUserInfo(req, res) {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json(response({
        isSuccess: false,
        code: 400,
        message: 'user_id가 필요합니다.',
      }));
    }

    const userInfo = await UserService.getUserInfo(user_id);
    
    if (!userInfo) {
      return res.status(404).json(response({
        isSuccess: false,
        code: 404,
        message: '사용자를 찾을 수 없습니다.',
      }));
    }
    console.log('userInfo:', userInfo);

    res.status(200).json(response({
      isSuccess: true,
      code: 200,
      message: '조회 성공',
    }, userInfo));

  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
    }));
  }
}

export async function updateNickname(req, res) {
  try {
    const userId = req.headers['user_id']; // 헤더에서 user-id 읽기
    const { nickname } = req.body;

    if (!userId || !nickname) {
      return res.status(400).json(response({
        isSuccess: false,
        code: 400,
        message: 'user-id와 nickname이 필요합니다.',
      }));
    }

    try {
      const updatedUser = await UserService.updateNickname(userId, nickname);
      res.status(200).json(response({
        isSuccess: true,
        code: 200,
        message: '수정 성공',
      }, updatedUser));
    } catch (error) {
      if (error.message.includes('이미 등록된 닉네임')) {
        return res.status(409).json(response({
          isSuccess: false,
          code: 409,
          message: error.message,
        }));
      }
      throw error; // 다른 에러는 다시 던져서 아래의 catch 블록에서 처리
    }
  } catch (error) {
    console.error('닉네임 수정 중 오류 발생:', error);
    res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
    }));
  }
}

export async function deleteUser(req, res) {
  const userId = req.headers['user_id'];

  if (!userId) {
    return res.status(400).json(response({
      isSuccess: false,
      code: 400,
      message: 'user_id가 필요합니다.',
    }));
  }

  try {
    await UserService.deleteUser(userId);
    return res.status(200).json(response({
      isSuccess: true,
      code: 200,
      message: '계정이 성공적으로 삭제되었습니다.',
    }));
  } catch (error) {
    console.error('계정 삭제 중 오류 발생:', error);
    return res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
    }));
  }
}

// export async function getNotices(req, res) {
//   try {
//     const notices = await UserService.getNotices();
//     res.status(200).json(response({
//       isSuccess: true,
//       code: 200,
//       message: '공지사항 조회 성공',
//     }, notices));
//   } catch (error) {
//     console.error('공지사항 조회 중 오류 발생:', error);
//     res.status(500).json(response({
//       isSuccess: false,
//       code: 500,
//       message: '서버 오류가 발생했습니다.',
//     }));
//   }
// }
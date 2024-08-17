// srcs/user/user.controller.js
import * as UserService from './user.service.js';
import { response } from '../../config/response.js';

export async function signup(req, res) {
  try {
    const { email, password, nickname, car_number } = req.body;

    if (!email || !password || !nickname || !car_number) {
      return res.status(400).json(response({
        isSuccess: false,
        code: 400,
        message: '모든 필드가 필요합니다.',
        result: {} 
      }));
    }

    const newUser = await UserService.createUser({ email, password, nickname, car_number });
    res.status(201).json(response({
      isSuccess: true,
      code: 201,
      message: '사용자가 성공적으로 가입되었습니다.',
      result: newUser 
    }));
  } catch (error) {
    console.error('가입 중 오류 발생:', error);
    res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
      result: {} 
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
        result: {} 
      }));
    }

    const userInfo = await UserService.getUserInfo(user_id);
    if (!userInfo) {
      return res.status(404).json(response({
        isSuccess: false,
        code: 404,
        message: '사용자를 찾을 수 없습니다.',
        result: {} 
      }));
    }

    res.status(200).json(response({
      isSuccess: true,
      code: 200,
      message: '조회 성공',
      result: userInfo
    }));
  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    res.status(500).json(response({
      isSuccess: false,
      code: 500,
      message: '서버 오류가 발생했습니다.',
      result: {} 
    }));
  }
}

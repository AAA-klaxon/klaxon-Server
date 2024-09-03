import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as AuthModel from './auth.model.js';
import { generateTokens } from '../utils/jwt.utils.js';  // 토큰 생성 유틸리티 함수 가져오기

export async function createUser(userDTO) {
    const { email, car_number, nickname, password } = userDTO;

    // 이메일 중복 확인
    const existingUserByEmail = await AuthModel.getUserByEmail(email);
    if (existingUserByEmail) {
        throw new Error('이미 등록된 이메일입니다.');
    }

    // 차량 번호 중복 확인
    const existingUserByCarNumber = await AuthModel.getUserByCarNumber(car_number);
    if (existingUserByCarNumber) {
        throw new Error('이미 등록된 차량 번호입니다.');
    }

    // 닉네임 중복 확인
    const existingUserByNickname = await AuthModel.getUserByNickname(nickname);
    if (existingUserByNickname) {
        throw new Error('이미 등록된 닉네임입니다.');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    return AuthModel.createUser({ ...userDTO, password: hashedPassword });
}

export async function authenticateUser(email, password) {
    const user = await AuthModel.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    // const userId = user.user_id;
    // if (!userId) {
    //     throw new Error('사용자 ID가 누락되었습니다.');
    // }

    const { accessToken, refreshToken } = generateTokens(user.user_id, user.email, user.car_number);
    const updateResult = await AuthModel.updateUserRefreshToken(user.user_id, refreshToken);

    return { accessToken, refreshToken };
}

export async function refreshToken(refreshToken) {
    const user = await AuthModel.getUserByRefreshToken(refreshToken);

    // 리프레시 토큰이 NULL로 설정된 경우 처리
    if (!user || !refreshToken) {
        throw new Error('리프레시 토큰이 유효하지 않습니다.');
    }

    try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.user_id, user.email, user.car_number);

        await AuthModel.updateUserRefreshToken(user.user_id, newRefreshToken);

        return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
        console.error('Token verification failed:', error);
        throw new Error('리프레시 토큰이 만료되었습니다.');
    }
}






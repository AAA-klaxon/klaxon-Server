import * as ErrorService from './error.service.js';
import { response } from '../../config/response.js';

export async function getTopErrorProneSigns(req, res) {
  try {
    const topSigns = await ErrorService.getTopErrorProneSigns();
    res.status(200).json(response({
      code: 200,
      message: '오인식 비율이 높은 표지판',
    }, topSigns));
  } catch (error) {
    console.error('오인식 비율이 높은 표지판 조회 중 오류 발생:', error);
    res.status(500).json(response({
      code: 500,
      message: '서버 오류가 발생했습니다.',
    }));
  }
}

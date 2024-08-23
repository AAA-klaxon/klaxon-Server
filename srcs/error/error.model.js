// srcs/error/error.model.js
import pool from '../../config/db.js';
import { 
  GET_AVERAGE_ERROR_PERCENTAGE_BY_SIGN_QUERY,
  GET_SIGN_DETAILS_QUERY
} from './error.sql.js';

// 평균 오인식 비율이 높은 상위 3개 표지판 조회
export async function getAverageErrorPercentageBySign() {
  try {
    const [result] = await pool.query(GET_AVERAGE_ERROR_PERCENTAGE_BY_SIGN_QUERY);
    return result;
  } catch (error) {
    throw new Error('표지판의 평균 오인식 비율 조회 중 오류 발생');
  }
}

// 상위 3개 표지판의 상세 정보 조회
export async function getSignDetailsByIds(ids) {
  try {
    const [result] = await pool.query(GET_SIGN_DETAILS_QUERY, [ids]);
    return result;
  } catch (error) {
    throw new Error('표지판 상세 정보 조회 중 오류 발생');
  }
}

import pool from '../../config/db.js';
import { INSERT_ERROR_INFO_QUERY, GET_HIGH_MISRECOGNITION_SIGNS_QUERY } from './error.sql.js';

export async function insertErrorInfo(misrecognized_sign_name, recognized_sign_name) { // 두 개의 인자 추가
    const [result] = await pool.query(INSERT_ERROR_INFO_QUERY, [misrecognized_sign_name, recognized_sign_name]); // 두 번째 인자 추가
    return result.insertId; 
}
export async function getHighMisrecognitionSigns() {
    const [rows] = await pool.query(GET_HIGH_MISRECOGNITION_SIGNS_QUERY);
    
    const result = rows.map(row => {
        const recognizedCount = Number(row.recognized_count); // recognized_count를 숫자로 변환
        const misrecognitionCount = Number(row.misrecognition_count); // misrecognition_count를 숫자로 변환
        
        const misrecognition_rate = Math.round((misrecognitionCount / recognizedCount) * 100);
        
        return {
            recognized_sign_name: row.recognized_sign_name,
            recognized_count: recognizedCount,
            misrecognition_count: misrecognitionCount, // int로 변환
            misrecognition_rate: `${misrecognition_rate}%` // 백분율로 변환
        };
    });

    return result;
}


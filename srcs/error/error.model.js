import pool from '../../config/db.js';
import { INSERT_ERROR_INFO_QUERY, GET_HIGH_MISRECOGNITION_SIGNS_QUERY } from './error.sql.js';

export async function insertErrorInfo(misrecognized_sign_name) {
    const [result] = await pool.query(INSERT_ERROR_INFO_QUERY, [misrecognized_sign_name]);
    return result.insertId; 
}

export async function getHighMisrecognitionSigns() {
    const [rows] = await pool.query(GET_HIGH_MISRECOGNITION_SIGNS_QUERY);
    return rows;
}

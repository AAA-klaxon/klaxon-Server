import { insertErrorInfo, getHighMisrecognitionSigns as fetchHighMisrecognitionSigns } from './error.model.js';

export async function saveErrorInfo(misrecognized_sign_name, recognized_sign_name) { // 두 개의 인자 추가
    return await insertErrorInfo(misrecognized_sign_name, recognized_sign_name); // 두 개의 인자 전달
}

export async function getHighMisrecognitionSigns() {
    return await fetchHighMisrecognitionSigns(); // 중복된 이름을 피하기 위해 alias 사용
}

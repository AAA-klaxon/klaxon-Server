import { insertErrorInfo, getHighMisrecognitionSigns as fetchHighMisrecognitionSigns } from './error.model.js';

export async function saveErrorInfo(misrecognized_sign_name) {
    return await insertErrorInfo(misrecognized_sign_name);
}

export async function getHighMisrecognitionSigns() {
    return await fetchHighMisrecognitionSigns(); // 중복된 이름을 피하기 위해 alias 사용
}

import * as ErrorsService from './error.service.js';
import { response } from '../../config/response.js';
import { errorDTO } from './error.dto.js';
import { sendToClients } from '../../index.js'; // 경로 조정 필요

export async function postErrorInfo(req, res) {
    try {
        const { misrecognized_sign_name } = req.body;

        if (!misrecognized_sign_name) {
            return res.status(400).json(response({
                isSuccess: false,
                code: 400,
                message: 'misrecognized_sign_name이 필요합니다.',
            }));
        }

        const accidentId = await ErrorsService.saveErrorInfo(misrecognized_sign_name);

        // 클라이언트에 알림 전송
        sendToClients({
            message: "새로운 오인식된 표지판 정보가 등록되었습니다.",
            data: {
                misrecognized_sign_name,
                accidentId,
            },
        });

        res.status(201).json(response({
            isSuccess: true,
            code: 201,
            message: "사고 정보가 성공적으로 저장되었습니다."
        }, accidentId));
    } catch (error) {
        console.error('사고 정보 저장 중 오류 발생:', error);
        res.status(500).json(response({
            isSuccess: false,
            code: 500,
            message: '서버 오류가 발생했습니다.',
        }, errorDTO('서버 오류가 발생했습니다.')));
    }
}

export async function getHighMisrecognitionSigns(req, res) {
    try {
        const signs = await ErrorsService.getHighMisrecognitionSigns();
        console.log("Fetched signs:", signs);

        res.status(200).json(response({
            isSuccess: true,
            code: 200,
            message: "오인식률 높은 표지판 조회 성공",
        }, signs));
    } catch (error) {
        console.error('오인식률 높은 표지판 조회 중 오류 발생:', error);
        res.status(500).json(response({
            isSuccess: false,
            code: 500,
            message: '서버 오류가 발생했습니다.',
        }, errorDTO('서버 오류가 발생했습니다.')));
    }
}

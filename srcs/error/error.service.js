import { getAverageErrorPercentageBySign, getSignDetailsByIds } from './error.model.js';

export async function getTopErrorProneSigns() {
  try {
    const averageErrorPercentages = await getAverageErrorPercentageBySign();
    const topSignsIds = averageErrorPercentages.map(sign => sign.id);

    if (topSignsIds.length === 0) {
      throw new Error('오인식 비율이 높은 표지판이 없습니다.');
    }

    const signDetails = await getSignDetailsByIds(topSignsIds);
    return signDetails;
  } catch (error) {
    console.error('오인식 비율이 높은 표지판 조회 중 오류 발생:', error);
    throw error;
  }
}

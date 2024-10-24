export const INSERT_ERROR_INFO_QUERY = `
    INSERT INTO ACCIDENT (misrecognized_sign_name, recognized_sign_name, recognized_at)
    VALUES (?, ?, NOW())
`;

export const GET_HIGH_MISRECOGNITION_SIGNS_QUERY = `
    SELECT recognized_sign_name, 
           COUNT(*) AS recognized_count, 
           SUM(misrecognized_sign_name != recognized_sign_name) AS misrecognition_count,
           SUM(misrecognized_sign_name != recognized_sign_name) / COUNT(*) AS misrecognition_rate
    FROM ACCIDENT
    GROUP BY recognized_sign_name
    ORDER BY misrecognition_rate DESC
    LIMIT 3
`;

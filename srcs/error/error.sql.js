export const INSERT_ERROR_INFO_QUERY = `
    INSERT INTO ACCIDENT (misrecognized_sign_name, recognized_at)
    VALUES (?, NOW())
`;

export const GET_HIGH_MISRECOGNITION_SIGNS_QUERY = `
    SELECT misrecognized_sign_name, COUNT(*) AS count
    FROM ACCIDENT
    GROUP BY misrecognized_sign_name
    ORDER BY count DESC
    LIMIT 3
`;

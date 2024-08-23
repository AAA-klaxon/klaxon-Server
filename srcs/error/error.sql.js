export const GET_AVERAGE_ERROR_PERCENTAGE_BY_SIGN_QUERY = `
  SELECT
    accident_id AS id,
    AVG(error_percentage) AS avg_error_percentage
  FROM ACCIDENT
  GROUP BY accident_id
  ORDER BY avg_error_percentage DESC
  LIMIT 3;
`;

export const GET_SIGN_DETAILS_QUERY = `
  SELECT
    accident_id AS id,
    location AS title,
    CONCAT('표지판 인식 결과 ', AVG(error_percentage), '% 오분류') AS text,
    MIN(image_url) AS img_url  -- Assume image_url is the same for each sign
  FROM ACCIDENT
  WHERE accident_id IN (?)
  GROUP BY accident_id, location
  ORDER BY AVG(error_percentage) DESC;
`;

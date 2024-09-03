// srcs/user/user.sql.js
export const GET_USER_INFO_QUERY = `
  SELECT user_id AS id, nickname, car_number , email
  FROM USER 
  WHERE user_id = ?
`;

export const UPDATE_USER_NICKNAME_QUERY = `
  UPDATE USER
  SET nickname = ?
  WHERE user_id = ?
`;

export const DELETE_USER_QUERY = `
  DELETE FROM USER
  WHERE user_id = ?
`;

// export const GET_NOTICES_QUERY = `
//   SELECT notice_id AS id, date, title, text
//   FROM NOTICE
// `;
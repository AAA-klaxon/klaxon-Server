// srcs/user/user.sql.js
export const CREATE_USER_QUERY = `
  INSERT INTO USER (status, email, password, nickname, car_number)
  VALUES ('active', ?, ?, ?, ?)
`;

export const GET_USER_INFO_QUERY = `
  SELECT user_id AS id, nickname, car_number , email
  FROM USER 
  WHERE user_id = ?
`;

export const GET_USER_BY_EMAIL_QUERY = `
  SELECT * FROM USER
  WHERE email = ?
`;

export const GET_USER_BY_CAR_NUMBER_QUERY = `
  SELECT * FROM USER
  WHERE car_number = ?
`;

export const GET_USER_BY_NICKNAME_QUERY = `
  SELECT * FROM USER
  WHERE nickname = ?
`;

export const GET_USER_BY_PASSWORD_QUERY = `
  SELECT * FROM USER
  WHERE password = ?
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
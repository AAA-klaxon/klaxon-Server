// srcs/user/user.sql.js
export const CREATE_USER_QUERY = `
  INSERT INTO USER (status, email, password, nickname, car_number)
  VALUES ('active', ?, ?, ?, ?)
`;

export const GET_USER_INFO_QUERY = `
  SELECT * FROM USER WHERE id = ?
`;

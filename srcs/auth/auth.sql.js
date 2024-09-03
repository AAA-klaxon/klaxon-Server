
// 이메일로 사용자 조회
export const GET_USER_BY_EMAIL_QUERY = `
  SELECT * 
  FROM USER 
  WHERE email = ?
`;

// 차량 번호로 사용자 조회
export const GET_USER_BY_CAR_NUMBER_QUERY = `
  SELECT * 
  FROM USER 
  WHERE car_number = ?
`;

export const GET_USER_BY_NICKNAME_QUERY = `
  SELECT * 
  FROM USER 
  WHERE nickname = ?
`;

// 사용자 생성 쿼리문
export const CREATE_USER_QUERY = `
  INSERT INTO USER (status, email, password, nickname, car_number) 
  VALUES ('active',?, ?, ?, ?)
`;

// 사용자 리프레시 토큰 업데이트 쿼리문
export const UPDATE_USER_REFRESH_TOKEN_QUERY = `
  UPDATE USER 
  SET refreshtoken = ? 
  WHERE user_id = ?
`;

// 사용자 리프레시 토큰 삭제 쿼리문
export const DELETE_USER_REFRESH_TOKEN_QUERY = `
  UPDATE USER 
  SET refreshtoken = NULL 
  WHERE user_id = ?
`;

// 리프레시 토큰으로 사용자 조회
export const GET_USER_BY_REFRESH_TOKEN_QUERY = `
  SELECT * 
  FROM USER 
  WHERE refreshtoken = ?
`;

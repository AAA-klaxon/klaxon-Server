// srcs/community/community.sql.js
export const GET_POSTS_QUERY = `
  SELECT * FROM POST ORDER BY created_at DESC
`;

export const CREATE_POST_QUERY = `
  INSERT INTO POST (user_id, title, main_text, created_at)
  VALUES (?, ?, ?, NOW())
`;

export const GET_POST_QUERY = `
  SELECT * FROM POST WHERE post_id = ?
`;

export const CREATE_COMMENT_QUERY = `
  INSERT INTO COMMENT (post_id, user_id, text, created_at)
  VALUES (?, ?, ?, NOW())
`;

export const GET_COMMENT_QUERY = `  
  SELECT * FROM COMMENT WHERE post_id = ? ORDER BY created_at DESC;

`;

export const ADD_LIKE_QUERY = `
  INSERT INTO POST_LIKES (post_id, user_id, created_at)
  VALUES (?, ?, NOW())
`;

export const REMOVE_LIKE_QUERY = `
  DELETE FROM POST_LIKES WHERE post_id = ? AND user_id = ?
`;

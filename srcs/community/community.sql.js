// srcs/community/community.sql.js
export const GET_POSTS_QUERY = `
  SELECT 
    post_id, 
    user_id, 
    title, 
    main_text, 
    created_at,
    (SELECT nickname FROM USER WHERE USER.user_id = POST.user_id) AS nickname, -- 변경된 필드 이름
    (SELECT COUNT(*) FROM POST_LIKES WHERE post_id = POST.post_id) AS like_count,
    (SELECT COUNT(*) FROM COMMENT WHERE post_id = POST.post_id) AS comment_count
  FROM POST
  ORDER BY created_at DESC
`;

export const CREATE_POST_QUERY = `
  INSERT INTO POST (user_id, title, main_text, created_at)
  VALUES (?, ?, ?, NOW())
`;

export const GET_POST_QUERY = `
  SELECT 
    post_id, 
    user_id, 
    title, 
    main_text, 
    created_at,
    (SELECT nickname FROM USER WHERE USER.user_id = POST.user_id) AS nickname, -- 변경된 필드 이름
    (SELECT COUNT(*) FROM POST_LIKES WHERE post_id = POST.post_id) AS like_count,
    (SELECT COUNT(*) FROM COMMENT WHERE post_id = POST.post_id) AS comment_count
  FROM POST
  WHERE post_id = ?
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

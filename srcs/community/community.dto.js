// srcs/community/community.dto.js
// 게시글 조회 DTO
export class getPostDTO {
  constructor(post) {
    this.post_id = post.post_id;
    this.user_id = post.user_id;
    this.nickname = post.nickname;
    this.title = post.title;
    this.main_text = post.main_text;
    this.createdAt = post.created_at;
    this.like_count = post.like_count;
    this.comment_count = post.comment_count;
  }
}

// 게시글 작성 DTO
export class writePostDTO {
  constructor(post) {
    this.post_id = post.post_id;
    this.user_id = post.user_id;
    this.nickname = post.nickname;
    this.title = post.title;
    this.main_text = post.main_text;
    this.createdAt = post.created_at;
  }
}

// 댓글 DTO (변경 없음)
export class CommentDTO {
  constructor(comment) {
    this.comment_id = comment.comment_id;
    this.post_id = comment.post_id;
    this.user_id = comment.user_id;
    this.text = comment.text;
    this.createdAt = comment.created_at;
  }
}

// srcs/community/community.dto.js
// 게시글 DTO
export class PostDTO {
    constructor(post) {
      this.post_id = post.post_id;
      this.user_id = post.user_id;
      this.title = post.title;
      this.main_text = post.main_text;
      this.createdAt = post.created_at;
    }
  }
  
  // 댓글 DTO
  export class CommentDTO {
    constructor(comment) {
      this.comment_id = comment.comment_id;
      this.post_id = comment.post_id;
      this.user_id = comment.user_id;
      this.text = comment.text;
      this.createdAt = comment.created_at;
    }
  }
  
export class AuthDTO {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  
    static fromRequestBody(body) {
      return new AuthDTO(body.email, body.password);
    }
  }
  
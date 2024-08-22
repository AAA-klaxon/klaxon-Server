// srcs/user/user.dto.js
class UserDTO {
  constructor(email, password, nickname, car_number) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.car_number = car_number;
  }

  static fromRequestBody(body) {
    return new UserDTO(body.email, body.password, body.nickname, body.car_number);
  }
}

export default UserDTO;

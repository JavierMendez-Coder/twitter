const User = require("./../models/User");

class  UserService {
  static create(id, username, name) {
    return new User(id, username, name, "bio");
  }

  static getInfo(user) {
    return Object.values(user);
  }

  static updateUserUsername(user, username) {
    user.setUsername = username;
  }

  static getAllUsernames(usersList) {
    return usersList.map((user) => user.getUsername);
  }
}

module.exports = UserService;

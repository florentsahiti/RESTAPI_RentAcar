const { ObjectId } = require("mongodb");

class User {
  constructor(fullname, username, email, password) {
    this._id = new ObjectId();
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toDocument() {
    return {
      _id: this._id,
      fullname: this.fullname,
      username: this.username,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromDocument(document) {
    const user = new User(
      document.fullname,
      document.username,
      document.email,
      document.password
    );
    user._id = document._id;
    user.createdAt = document.createdAt;
    user.updatedAt = document.updatedAt;
    return user;
  }
}

module.exports = User;

const db = require('../db');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const saltRounds = 13;
const superSecret = "super_secret_string";

module.exports.UsersService = class UsersService {
  async register(username, password) {
    this.validateUsername(username);
    this.validatePassword(password);

    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {id: id, username: username, password: hashedPassword};

    db.Users.insert(user);

    const payload = {id: user.id};
    return jwt.sign(payload, superSecret, {expiresIn: "7d"})
  }

  validateUsername(username) {
    if (!username) {
      throw new Error("Username is empty");
    }

    if (username.length < 5) {
      throw new Error("Username is too short");
    }

    const usersWithSameUsername = db.Users.count({username: username});
    if (usersWithSameUsername) {
      throw new Error("Username is already in use");
    }
  }

  validatePassword(password) {
    if (!password) {
      throw new Error("Password is empty");
    }

    if (password.length < 8) {
      throw new Error("Password is too short");
    }

    const hasUppercaseLetters = /[A-Z]/.test(password);
    const hasLowercaseLetters = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialCharacters = /[^A-Za-z\d]/.test(password);
    if (!hasDigits || !hasUppercaseLetters || !hasLowercaseLetters || !hasSpecialCharacters) {
      throw new Error(`Password should contain at least one upper case letter, one lowercase 
      letter, one digit, and one special character`);
    }
  }

  async login(username, password) {
    const msg = "Invalid username or password";
    const user = db.Users.findOne({username: username});
    if (!user) {
      throw new Error(msg);
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new Error(msg);
    }

    const payload = {id: user.id};
    return jwt.sign(payload, superSecret, {expiresIn: "7d"})
  }

  authenticate(token) {
    const msg = "Invalid access token";
    const payload = jwt.decode(token, superSecret);
    if (!payload || !payload.id) {
      throw Error(msg);
    }

    const user = db.Users.findOne({id: payload.id});
    if (!user) {
      throw new Error(msg);
    }

    return user;
  }
};

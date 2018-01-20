const db = require('../db');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const saltRounds = 13;
const superSecret = "super_secret_string";

module.exports.UsersService = class UsersService {
  async register(username, password) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {id: id, username: username, password: hashedPassword};

    db.Users.insert(user);

    const payload = {id: user.id};
    return jwt.sign(payload, superSecret, {expiresIn: "7d"})
  }

  async login(username, password) {
    const msg = "Invalid username or password";
    const foundUsers = db.Users.find({username: username});
    if (!foundUsers.length) {
      throw new Error(msg);
    }

    const user = foundUsers[0];
    const passwordMatched = await bcrypt.compare(password, user.password)

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

    const foundUsers = db.Users.find({id: payload.id});
    if (!foundUsers.length) {
      throw new Error(msg);
    }

    return foundUsers[0];
  }
};

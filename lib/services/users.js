const db = require('../db');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const saltRounds = 13;
const superSecret = "super_secret_string";

module.exports.UsersService = class UsersService {
  async register(username, password) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = {userId: userId, username: username, password: hashedPassword};

    db.Users.insert(user);
    return generateJWT(user);
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

    return generateJWT(user);
  }
};

function generateJWT(user) {
  const payload = {
    userId: user.userId
  };

  return jwt.sign(payload, superSecret, {expiresIn: "7d"})
}

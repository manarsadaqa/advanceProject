const bcrypt = require("bcrypt");
const { findUser } = require("../../models/userModle");

const validateCredentials = async (username, password) => {
  if (!username || !password) {
    throw new Error("Missing username or password");
  }

  try {
    const usersFound = await findUser({ username });
    if (usersFound.length === 0) {
      throw new Error("Invalid username password combination");
    }

    const user = usersFound[0];
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new Error("Invalid username password combination");
    }
    return user;
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
};

module.exports = { validateCredentials };

import passport from "passport";
import { Strategy } from "passport-local";

import { IUser } from "../../models/user";
import UserService from "../../services/UserService";
import { comparePassword } from "../../utils/credentialsUtils";

// after login, store the username in request.user
passport.serializeUser((user, cb) => {
  cb(null, (user as IUser).username);
});

// using the user ID, retrieve the user object
passport.deserializeUser(async (username: string, cb) => {
  try {
    const userService = new UserService();
    const foundUser = await userService.fetchUserByUsername(username);

    if (!foundUser) {
      throw new Error("User Not Found");
    }

    cb(null, foundUser);
  } catch (err) {
    cb(err);
  }
});

export default passport.use(
  new Strategy(async (username, password, cb) => {
    try {
      const userService = new UserService();
      const foundUser = await userService.fetchUserByUsername(username);

      if (!foundUser) {
        throw new Error("Incorrect username or password");
      }

      const passwordMatches = await comparePassword(password, foundUser.password);

      if (!passwordMatches) {
        throw new Error("Incorrect username or password");
      }

      cb(null, foundUser);
    } catch (error) {
      cb(error);
    }
  }),
);

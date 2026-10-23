import passport from "passport";
import { Strategy } from "passport-local";

import UserService from "../../services/UserService";
import { INVALID_CREDENTIALS_ERROR } from "../../errors/authErrors";
import { comparePassword } from "../../utils/credentialsUtils";

// after login, store only the user ID in the session
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// using the user ID, retrieve the user identity for request.user
passport.deserializeUser(async (userId: string, cb) => {
  try {
    const userService = new UserService();
    const sessionUser = await userService.fetchSessionUser(userId);

    // false treats the session as logged out instead of failing every request for a deleted user
    cb(null, sessionUser ?? false);
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
        throw INVALID_CREDENTIALS_ERROR;
      }

      const passwordMatches = await comparePassword(password, foundUser.password);

      if (!passwordMatches) {
        throw INVALID_CREDENTIALS_ERROR;
      }

      cb(null, { id: foundUser._id.toHexString(), username: foundUser.username });
    } catch (error) {
      cb(error);
    }
  }),
);

import { HydratedDocument } from "mongoose";

import User, { IUser } from "../models/user";
import { hashPassword } from "../utils/credentialsUtils";

const SALT_ROUNDS = 10;

class UserService {
  /** removes the password field and not return it to the caller */
  private sanitizePassword(user: HydratedDocument<IUser>): Partial<IUser> {
    const userClone = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userClone;

    return rest;
  }

  /** Creates a new user in the database */
  async createUser(
    username: string,
    password: string,
    displayName?: string,
  ): Promise<Partial<IUser>> {
    const hashedPassword = await hashPassword(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      password: hashedPassword,
      displayName: displayName ?? username,
    });
    await newUser.save();

    return this.sanitizePassword(newUser);
  }

  /** Retrieves a user by user ID */
  async fetchUserById(userId: string): Promise<Partial<IUser> | null> {
    const user = await User.findById(userId);

    if (user == null) {
      return null;
    }

    return this.sanitizePassword(user);
  }

  /** Retrieves a list of users by user IDs */
  async fetchUsersByIds(userIds: string[]): Promise<Partial<IUser>[]> {
    const result: Partial<IUser>[] = [];

    for (const userId of userIds) {
      const temp = await User.findById(userId);

      if (temp != null) {
        result.push(this.sanitizePassword(temp));
      }
    }

    return result;
  }

  /** Retrieves a user by username */
  async fetchUserByUsername(username: string): Promise<IUser | null> {
    const result = await User.findOne({ username: username.toLowerCase() });

    return result;
  }

  /** Retrieves a list of users matching the given username or displayname */
  async fetchUsers(queryString: string): Promise<Partial<IUser>[]> {
    const regexp = new RegExp(queryString, "i");
    const matchedUsers = await User.find({
      $or: [{ username: regexp }, { displayName: regexp }],
    });

    const result = matchedUsers.map((user) => this.sanitizePassword(user));

    return result;
  }
}

export default UserService;

import { compare, hash } from "bcrypt";
import { HydratedDocument, Types } from "mongoose";

import User, { IUser } from "../models/user";

const SALT_ROUNDS = 10;

class UserService {
  /** removes the password field and not return it to the caller */
  private sanitizePassword(user: HydratedDocument<IUser>): Partial<IUser> {
    const userClone = user.toObject();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = userClone;

    return rest;
  }

  /** Match a plain text password against a hashed password */
  private async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainTextPassword, hashedPassword);
  }

  /** Creates a new user in the database */
  async createUser(
    username: string,
    password: string,
    displayName?: string,
  ): Promise<Partial<IUser>> {
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const newUser = new User({
      username,
      password: hashedPassword,
      displayName: displayName ?? username,
    });
    await newUser.save();

    return this.sanitizePassword(newUser);
  }

  /** Retrieves a user by user ID */
  async getUser(userId: Types.ObjectId): Promise<Partial<IUser> | null> {
    const user = await User.findById(userId);

    if (user == null) {
      return null;
    }

    return this.sanitizePassword(user);
  }

  /** Retrieves a list of users by user IDs */
  async getUsers(userIds: Types.ObjectId[]): Promise<Partial<IUser>[]> {
    const result: Partial<IUser>[] = [];

    for (const userId of userIds) {
      const temp = await User.findById(userId);

      if (temp != null) {
        result.push(this.sanitizePassword(temp));
      }
    }

    console.log(result);

    return result;
  }

  /** Checks if the user with the credentials exists in the database */
  async login(username: string, password: string): Promise<string> {
    const user = await User.findOne({ username });

    if (user == null) {
      throw new Error("Invalid username or password");
    }

    const passwordMatched = await this.comparePassword(password, user.password);

    if (!passwordMatched) {
      throw new Error("Invalid username or password");
    }

    return user._id as unknown as string;
  }
}

export default UserService;

import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  displayName: string;
  bio: string;
  title: string;
  isBanned: boolean;
  joinedDate: Date;
  lastSignedIn: Date;
}

const schema = new Schema<IUser>(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      minLength: 4,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    displayName: {
      type: String,
    },
    bio: {
      type: String,
    },
    title: {
      type: String,
      default: "Member",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    lastSignedIn: {
      type: Date,
    },
  },
  { versionKey: false },
);

const User = model("User", schema);

export default User;

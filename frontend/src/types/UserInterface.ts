interface UserInterface {
  _id: string;
  username: string;
  password: string;
  title: string;
  displayName: string;
  bio: string;
  joinedDate: string;
  isBanned: boolean;
  hasPasswordReset: boolean;
}

export default UserInterface;

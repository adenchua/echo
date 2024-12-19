interface User {
  _id: string;
  username: string;
  title: string;
  displayName: string;
  bio?: string;
  joinedDate: string;
  isBanned: boolean;
}

export default User;

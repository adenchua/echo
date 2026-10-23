/** The logged-in user, as returned by the server's session endpoint */
interface SessionUser {
  id: string;
  username: string;
}

export default SessionUser;

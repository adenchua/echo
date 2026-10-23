// shape of request.user for authenticated requests, populated by passport's deserializeUser
declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
    }
  }
}

export {};

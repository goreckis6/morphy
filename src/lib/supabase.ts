// Database functionality temporarily disabled
// This file will be re-enabled when database is needed

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Session {
  user: User;
  access_token: string;
}
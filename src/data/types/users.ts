export interface BaseUser {
  id: string;
  email: string;
  username: string;
}

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

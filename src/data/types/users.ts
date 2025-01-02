export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
}

export interface BaseUser {
  id: string;
  email: string;
  username: string;
}

export interface User extends BaseUser {
  password: string;
  role: UserRoles;
}

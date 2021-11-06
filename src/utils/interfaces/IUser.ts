import { UserRole } from "../enums/roles";

export interface IUser {
  id?: number;

  firstName: string;

  lastName: string;
  password: string;

  age: number;

  username: string;

  role: UserRole;
}

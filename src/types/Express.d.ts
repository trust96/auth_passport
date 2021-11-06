import { IUser } from "../utils/interfaces/IUser";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}

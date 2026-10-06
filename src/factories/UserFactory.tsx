import UserModel, { type UserProps } from "../models/UserModel";

class UserFactory {
  constructor(data: UserProps, type: string) {
    if (type === "json") {
      return new UserModel(data);
    }
  }
}

export default UserFactory;

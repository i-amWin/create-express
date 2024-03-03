import UserModel, { User } from "./user.model";

export const UserService = {
  getUsers: () => UserModel.find(),
  createUser: (data: User) => UserModel.create(data),
};

import UserModel from "./user.model.js";

export const UserService = {
  getUsers: () => UserModel.find(),
  createUser: (data) => UserModel.create(data),
};

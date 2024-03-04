import { prisma } from "../../../lib/db";
import { type User } from "@prisma/client";

export const UserService = {
  getUsers: () => prisma.user.findMany(),
  createUser: (data: Omit<User, "id">) => prisma.user.create({ data }),
};

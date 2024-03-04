import { prisma } from "../../../lib/db";

export const UserService = {
  getUsers: () => prisma.user.findMany(),
  createUser: (data) => prisma.user.create({ data }),
};

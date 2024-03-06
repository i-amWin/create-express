import { Request, Response } from "express";
import { UserService } from "./users.service";
import { catchAsyncError } from "../../../middlewares/catch-async-error";
import { CustomError } from "../../../utils/custom-error";
import { createUserSchema } from "./user.zodSchema";

// Route: GET /api/v1/users
const getUsers = catchAsyncError(async (req: Request, res: Response) => {
  const users = await UserService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

// Route: POST /api/v1/users
const createUser = catchAsyncError(async (req: Request, res: Response) => {
  const response = createUserSchema.safeParse(req.body);

  if (!response.success) {
    throw new CustomError(400, "Invalid Credentials");
  }

  const user = await UserService.createUser(response.data);

  res.status(201).json({
    success: true,
    data: user,
  });
});

export const UserController = {
  getUsers,
  createUser,
};

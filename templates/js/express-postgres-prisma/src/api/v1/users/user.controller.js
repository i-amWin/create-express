import { UserService } from "./users.service.js";
import { catchAsyncError } from "../../../middlewares/catch-async-error.js";
import { CustomError } from "../../../utils/custom-error.js";

// Route: GET /api/v1/users
const getUsers = catchAsyncError(async (req, res) => {
  const users = await UserService.getUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
});

// Route: POST /api/v1/users
const createUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError(400, "Please provide name, email and password");
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

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom-error";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal server error";

  switch (true) {
    case err instanceof CustomError:
      statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof Error:
      message = err.message;
      break;

    case err && typeof err === "object" && "message" in err:
      message = String(err.message);
      break;

    case typeof err === "string":
      message = err;
      break;

    default:
      break;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

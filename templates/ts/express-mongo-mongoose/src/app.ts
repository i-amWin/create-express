import express from "express";
import cors from "cors";
import helmet from "helmet";

import { errorMiddleware } from "./middlewares/error-middleware";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";

import apiRouter from "./api";

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());

// CORS
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.use("/api", apiRouter);

// Error middleware
app.use(errorMiddleware);

// Not found middleware
app.use(notFoundMiddleware);

export default app;

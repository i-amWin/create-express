import dotenv from "dotenv";
dotenv.config();
import "./utils/env-validation";

import app from "./app";
import { prisma } from "./lib/db";

const PORT = parseInt(process.env.PORT) || 3000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server listening on ${
      process.env.NODE_ENV === "development" ? "http://localhost:" : ""
    }${PORT}`
  );
});

// Close Prisma client on exit
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { prisma } from "./lib/db.js";

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

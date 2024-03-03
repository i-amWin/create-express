import dotenv from "dotenv";
dotenv.config();
import "./utils/env-validation";

import app from "./app";

const PORT = parseInt(process.env.PORT) || 3000;

// Start server
app.listen(PORT, () => {
  console.log(
    `Server listening on ${
      process.env.NODE_ENV === "development" ? "http://localhost:" : ""
    }${PORT}`
  );
});

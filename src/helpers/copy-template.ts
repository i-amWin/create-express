import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { Database, ORM } from "./take-user-input.js";

export const copyTemplate = (
  projectName: string,
  projectPath: string,
  isTypeScript: boolean,
  database: Database,
  orm: ORM
) => {
  let templatesDir = path.join(__dirname, "..", "..", "templates");

  if (isTypeScript) {
    templatesDir = path.join(templatesDir, "ts");
  } else {
    templatesDir = path.join(templatesDir, "js");
  }

  if (database === "mongodb" && orm === "mongoose") {
    templatesDir = path.join(templatesDir, "express-mongo-mongoose");
  } else if (database === "mongodb" && orm === "prisma") {
    templatesDir = path.join(templatesDir, "express-mongo-prisma");
  } else {
    templatesDir = path.join(templatesDir, "express");
  }

  fs.cpSync(templatesDir, projectPath, { recursive: true });
};

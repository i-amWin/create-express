import { execSync } from "node:child_process";
import { ORM } from "../helpers/take-user-input.js";
import { log, spinner } from "@clack/prompts";

const s = spinner();

const BASE_DEPENDENCIES = "express dotenv cors helmet";

export const installDependencies = (
  installCommand: string,
  isTypeScript: boolean,
  orm: ORM
) => {
  let dependencies = BASE_DEPENDENCIES;

  if (isTypeScript) {
    dependencies += " zod";
  }

  if (orm === "mongoose") {
    dependencies += " mongoose";
  } else if (orm === "prisma") {
    dependencies += " @prisma/client";
  }

  log.info(
    `Dependencies to install: \n${dependencies
      .split(" ")
      .map((s) => "- " + s)
      .join("\n")}`
  );

  s.start("Installing dependencies...");
  execSync(`${installCommand} ${dependencies}`);
  s.stop("Dependencies installed!");
};

import { log, spinner } from "@clack/prompts";
import { execSync } from "node:child_process";
import { ORM } from "../helpers/take-user-input.js";

const s = spinner();

export const installDevDependencies = (
  installCommand: string,
  isTypeScript: boolean,
  orm: ORM
) => {
  let devDependencies = "";
  if (isTypeScript) {
    devDependencies +=
      "typescript @types/node @types/express @types/cors ts-node-dev";
  } else {
    devDependencies += "nodemon";
  }

  if (orm === "prisma") {
    devDependencies += " prisma";
  }

  log.info(
    `Dev dependencies to install: \n${devDependencies
      .split(" ")
      .map((s) => "- " + s)
      .join("\n")}`
  );

  s.start("Installing dev dependencies...");
  execSync(`${installCommand} -D ${devDependencies}`);
  s.stop("Dev dependencies installed!");
};

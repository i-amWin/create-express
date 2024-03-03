import path from "node:path";
import fs from "node:fs";
import { takeUserInput } from "./helpers/take-user-input.js";
import { copyTemplate } from "./helpers/copy-template.js";
import { installDependencies } from "./installers/install-dependencies.js";
import { installDevDependencies } from "./installers/install-dev-dependencies.js";
import { log, confirm, intro, note } from "@clack/prompts";

(async () => {
  intro("Welcome to the Express API generator!");
  const { name, isTypeScript, packageManager, database, orm } =
    await takeUserInput();

  const projectName = name === "." ? path.basename(process.cwd()) : name;
  const projectPath = path.resolve(process.cwd(), name);
  const installCommand = packageManager === "npm" ? "npm install" : "pnpm add";

  // Create the project directory if it doesn't exist
  if (name !== ".") {
    fs.mkdirSync(name);
  } else if (fs.readdirSync(projectPath).length > 0) {
    log.error("Your project directory is not empty!");
    const shouldContinue = await confirm({
      message:
        "Do you want to continue? (It continue all files will be deleted!)",
      initialValue: false,
    });

    if (!shouldContinue) {
      process.exit(1);
    }

    log.info("Deleting all files in the project directory...");
    const files = fs.readdirSync(projectPath);

    for (const file of files) {
      fs.rmSync(path.resolve(projectPath, file), { recursive: true });
    }
  }

  // Copy the template to the project directory
  copyTemplate(projectName, projectPath, isTypeScript, database, orm);

  // Install the dependencies
  installDependencies(installCommand, isTypeScript, orm);

  // Install dev dependencies
  installDevDependencies(installCommand, isTypeScript, orm);

  note(
    `${name === "." ? "" : `cd ${projectName}\n`}${
      orm === "prisma"
        ? packageManager === "npm"
          ? "npm run db:generate\n"
          : "pnpm db:generate\n"
        : ""
    }${packageManager} run dev`,
    "Next steps"
  );
})();

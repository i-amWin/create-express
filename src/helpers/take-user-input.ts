import { text, confirm, group, select, log } from "@clack/prompts";

export type PackageManager = "npm" | "pnpm";
export type Database = "mongodb" | "postgresql" | "none";
export type ORM = "prisma" | "mongoose";

export async function takeUserInput() {
  const userInput = await group(
    {
      name: () =>
        text({
          message: "Enter the project name:",
          placeholder: "my-project",
          defaultValue: ".",
        }),
      isTypeScript: () =>
        confirm({
          message: "Do you wanna use TypeScript?",
          initialValue: true,
        }),
      packageManager: () =>
        select({
          message: "Choose a package manager:",
          options: [
            { value: "npm", label: "NPM" },
            { value: "pnpm", label: "PNPM" },
          ],
          initialValue: "pnpm",
        }),
      database: () =>
        select({
          message: "Choose a database:",
          options: [
            { value: "mongodb", label: "MongoDB" },
            { value: "postgresql", label: "PostgreSQL" },
            { value: "none", label: "None" },
          ],
          initialValue: "none",
        }),
      orm: ({ results: { database } }) => {
        if (database === "none") return;

        return select({
          message: "Choose an ORM:",
          options:
            database === "mongodb"
              ? [
                  { value: "mongoose", label: "Mongoose" },
                  { value: "prisma", label: "Prisma" },
                ]
              : [{ value: "prisma", label: "Prisma" }],

          initialValue: database === "mongodb" ? "mongoose" : "prisma",
        });
      },
    },
    {
      onCancel: () => {
        log.error("User cancelled the process.");
        process.exit(0);
      },
    }
  );

  return {
    name: userInput.name,
    isTypeScript: userInput.isTypeScript,
    packageManager: userInput.packageManager as PackageManager,
    database: userInput.database as Database,
    orm: userInput.orm as ORM,
  };
}

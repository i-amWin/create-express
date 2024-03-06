import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string(),
  DATABASE_URL: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

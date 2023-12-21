import type { Config } from "drizzle-kit";
import { config } from "src/config";

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: config.databaseUri,
    authToken: config.databaseAuthToken
  }
} satisfies Config;
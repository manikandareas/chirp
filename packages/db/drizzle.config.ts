import type { Config } from "drizzle-kit";
// import { config } from 'src/config';

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN as string,
  },
} satisfies Config;

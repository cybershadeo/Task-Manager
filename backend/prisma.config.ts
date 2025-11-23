import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Your cloud database connection
    url: "postgresql://4931a5eaf5ab4b3f962c774ae3c0bde802a689444b6fba671c5751cce7c22a50:sk_Znq-gGPf8-lBFcTaEhEdm@db.prisma.io:5432/postgres?sslmode=require",
  },
});
import { existsSync, copyFileSync } from "fs";

const envPath = ".env";
const envExamplePath = ".env.example";

if (!existsSync(envPath)) {
  console.log("⚡ .env not found, copying from .env.example...");
  copyFileSync(envExamplePath, envPath);
  console.log("✅ .env created successfully!");
} else {
  console.log("🔹 .env already exists, skipping copy.");
}
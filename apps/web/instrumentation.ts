import { onStartServer } from "./src/shared/lib/startup";

export async function register() {
  await onStartServer()
}
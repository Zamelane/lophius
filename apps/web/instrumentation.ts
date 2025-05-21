import { onStartServer } from "./validates/on-start-server";

export async function register() {
  await onStartServer()
}
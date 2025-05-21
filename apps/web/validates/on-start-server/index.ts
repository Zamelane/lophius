import { listSeeder } from "./lists-seeder";


export async function onStartServer() {
  await listSeeder()
}
"use server";
import { Client } from "database";
import { ApiResponse } from "@/interfaces";

type Config = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

export async function RecreateSchema(config: Config, schemaName: string = "public"): Promise<ApiResponse<undefined>> {
  try {
    const client = new Client(config)
    await client.connect()
    const query = `DROP SCHEMA IF EXISTS ${schemaName} CASCADE; CREATE SCHEMA ${schemaName}; GRANT ALL ON SCHEMA public TO ${config.user};`
    await client.query(query)
    await client.end()
    return {
      success: true,
      data: undefined,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        i18n: "",
        message: err instanceof Error ? err.message : `${err}`,
      },
    };
  }
}
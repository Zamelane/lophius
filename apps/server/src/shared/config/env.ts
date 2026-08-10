const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
  ?? process.env;

export const BOT_TOKEN = env.BOT_TOKEN || "";
export const BOT_CHAT_ID = Number(env.BOT_CHAT_ID) || -1;
export const BOT_THREAD_ID = Number(env.BOT_THREAD_ID) || -1;

export const DB_FILE_NAME = env.DB_FILE_NAME || "";

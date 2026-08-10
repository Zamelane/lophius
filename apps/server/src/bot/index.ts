import { Bot } from "grammy";
import { BOT_TOKEN } from "@/shared/config";

const bot = new Bot(BOT_TOKEN);

bot.on("message", (ctx) => {
    console.log(`Received message from ${ctx.from?.username} (${ctx.msg.message_thread_id}): ${ctx.message.text}`);
});

bot.start();

export { bot };
import { bot } from "@/bot";
import { BOT_CHAT_ID, BOT_THREAD_ID } from "@/shared/config";
import Elysia, { t } from "elysia";

const app = new Elysia().post("/test", ({ set, body }) => {
    set.status = 200;

    bot.api.sendMessage(BOT_CHAT_ID, `Название вкладки: ${body.name}`, {
        message_thread_id: BOT_THREAD_ID
    });

    return {
        status: "ok",
        name: body.name,
    }
},
{
    body: t.Object({
        name: t.String(),
    }),
});

export default app;
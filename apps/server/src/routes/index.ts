import Elysia, { t } from "elysia";

const app = new Elysia().post("/test", ({ set, body }) => {
    set.status = 200;

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
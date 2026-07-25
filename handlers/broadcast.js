import { db } from "../firebase.js";
import config from "../config.js";

let waiting = false;

export default function broadcast(bot) {

    bot.hears("📢 Broadcast", async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        waiting = true;

        await ctx.reply(
            "📢 Send the message to broadcast to all users."
        );

    });

    bot.on("text", async (ctx, next) => {

        if (!waiting) return next();

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        waiting = false;

        const users = await db.collection("users").get();

        let sent = 0;

        let failed = 0;

        for (const user of users.docs) {

            try {

                await bot.telegram.sendMessage(
                    user.id,
                    ctx.message.text
                );

                sent++;

            } catch {

                failed++;

            }

        }

        await ctx.reply(
`✅ Broadcast Complete

Sent: ${sent}

Failed: ${failed}`
        );

    });

}

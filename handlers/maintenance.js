import config from "../config.js";

let enabled = false;

export default function maintenance(bot) {

    bot.command("maintenance", async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        enabled = !enabled;

        await ctx.reply(
            enabled
                ? "🛠 Maintenance Enabled"
                : "✅ Maintenance Disabled"
        );

    });

    bot.use(async (ctx, next) => {

        if (
            enabled &&
            String(ctx.from.id) !== String(config.ADMIN_ID)
        ) {

            return ctx.reply(
                "🛠 TaskMint is under maintenance.\nPlease try again later."
            );

        }

        return next();

    });

}

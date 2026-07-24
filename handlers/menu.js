import { mainKeyboard } from "../keyboards/main.js";

export default function (bot) {

    bot.hears("🏠 Home", async (ctx) => {
        await ctx.reply(
            "🏠 Back to Home",
            mainKeyboard
        );
    });

}

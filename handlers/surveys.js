import { Markup } from "telegraf";
import crypto from "crypto";
import config from "../config.js";
import { getUser } from "../database/users.js";

export default function surveys(bot) {

    bot.hears("📋 Surveys", async (ctx) => {

        try {

            const user = await getUser(ctx.from.id);

            if (!user) {
                return ctx.reply("Please send /start first.");
            }

            const secureHash = crypto
                .createHash("md5")
                .update(`${ctx.from.id}-${config.CPX_SECURITY_HASH}`)
                .digest("hex");

            const surveyLink =
`https://offers.cpx-research.com/index.php?app_id=${config.CPX_APP_ID}&ext_user_id=${ctx.from.id}&secure_hash=${secureHash}&username=${encodeURIComponent(user.username || "")}&email=${encodeURIComponent(user.email || "")}`;

            await ctx.reply(

`📋 Available Surveys

💰 Complete surveys and earn money.

Your rewards are added automatically after CPX confirms the survey.

👇 Tap the button below.`,

                Markup.inlineKeyboard([
                    [
                        Markup.button.url(
                            "🚀 Start Surveys",
                            surveyLink
                        )
                    ]
                ])

            );

        } catch (err) {

            console.error(err);

            await ctx.reply("❌ Unable to load surveys.");

        }

    });

}

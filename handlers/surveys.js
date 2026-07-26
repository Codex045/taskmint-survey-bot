import crypto from "crypto";
import { Markup } from "telegraf";
import config from "../config.js";

export default function surveys(bot) {

    bot.hears("📋 Surveys", async (ctx) => {

        try {

            const userId = String(ctx.from.id);

            const secureHash = crypto
                .createHash("md5")
                .update(`${userId}-${config.CPX_SECURITY_HASH}`)
                .digest("hex");

            const surveyUrl =
                `https://offers.cpx-research.com/index.php` +
                `?app_id=${config.CPX_APP_ID}` +
                `&external_user_id=${userId}` +
                `&secure_hash=${secureHash}` +
                `&subid_1=telegram` +
                `&subid_2=taskmint`;

            await ctx.reply(
                `📋 *TaskMint Surveys*\n\n` +
                `💰 Complete surveys and earn money.\n\n` +
                `✅ Rewards are added automatically.\n\n` +
                `👇 Tap the button below to start.`,
                {
                    parse_mode: "Markdown",
                    ...Markup.inlineKeyboard([
                        [
                            Markup.button.url(
                                "🚀 Start Surveys",
                                surveyUrl
                            )
                        ]
                    ])
                }
            );

        } catch (err) {

            console.error(err);

            await ctx.reply(
                "❌ Unable to load surveys. Please try again later."
            );

        }

    });

}

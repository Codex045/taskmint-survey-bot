import { Markup } from "telegraf";
import config from "../config.js";

import {
    registerUser,
    updateLogin
} from "../database/users.js";

export default async function (ctx) {

    try {

        const args = ctx.message.text.split(" ");

        let referredBy = "";

        if (args.length > 1) {

            referredBy = args[1];

        }

        await registerUser(ctx.from, referredBy);

        await updateLogin(ctx.from.id);

        const isAdmin =
            String(ctx.from.id) === String(config.ADMIN_ID);

        const keyboard = isAdmin

            ? Markup.keyboard([
                ["📋 Surveys"],
                ["💰 Wallet", "💸 Withdraw"],
                ["👤 Profile", "👥 Invite Friends"],
                ["🎁 Daily Bonus", "📜 History"],
                ["📞 Support", "🔐 Admin"]
            ]).resize()

            : Markup.keyboard([
                ["📋 Surveys"],
                ["💰 Wallet", "💸 Withdraw"],
                ["👤 Profile", "👥 Invite Friends"],
                ["🎁 Daily Bonus", "📜 History"],
                ["📞 Support"]
            ]).resize();

        const username = ctx.from.username
            ? `@${ctx.from.username}`
            : ctx.from.first_name;

        await ctx.reply(
`👋 Welcome ${username}!

🎉 Welcome to *TaskMint Survey*.

💰 Complete surveys and earn money.

✨ Features:
• 📋 Paid Surveys
• 🎁 Daily Bonus
• 👥 Invite Friends
• 💰 Instant Wallet Updates
• 💸 Withdraw Your Earnings
• 📜 Transaction History

👇 Choose an option below to get started.`,
            {
                parse_mode: "Markdown",
                ...keyboard
            }
        );

    } catch (err) {

        console.error(err);

        await ctx.reply(
            "❌ Failed to start the bot. Please try again."
        );

    }

}

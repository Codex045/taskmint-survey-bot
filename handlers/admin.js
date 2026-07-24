import { Markup } from "telegraf";
import config from "../config.js";

const adminMenu = Markup.keyboard([
    ["📊 Dashboard"],
    ["👥 Users", "💵 Withdrawals"],
    ["📢 Broadcast"],
    ["⚙ Settings"],
    ["🏠 Home"]
]).resize();

export default function (bot) {

    bot.hears("🔐 Admin", async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) {
            return;
        }

        await ctx.reply(
            "🔐 Welcome to the Admin Panel",
            adminMenu
        );

    });

}

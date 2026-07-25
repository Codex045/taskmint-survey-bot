import { Markup } from "telegraf";
import config from "../config.js";
import { getUser } from "../database/users.js";

export default function invite(bot) {

    bot.hears("👥 Invite Friends", async (ctx) => {

        const user = await getUser(ctx.from.id);

        if (!user) return;

        const link =
`https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`;

        await ctx.reply(

`👥 Invite Friends

Earn ₦${config.REFERRAL_REWARD} for every friend that completes their FIRST survey.

Your Referral Link:

${link}`,

Markup.inlineKeyboard([
[
Markup.button.url(
"📤 Share Link",
`https://t.me/share/url?url=${encodeURIComponent(link)}`
)
]
])

        );

    });

}

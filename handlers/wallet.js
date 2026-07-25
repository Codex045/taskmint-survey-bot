import { getUser } from "../database/users.js";

export default function wallet(bot) {

    bot.hears("💰 Wallet", async (ctx) => {

        const user = await getUser(ctx.from.id);

        if (!user) return;

        await ctx.reply(

`💰 Wallet

Balance: ₦${user.balance}

Total Earned: ₦${user.totalEarned}

Withdrawn: ₦${user.totalWithdrawn}

Completed Surveys: ${user.completedSurveys}`

        );

    });

}

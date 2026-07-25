import { getUser } from "../database/users.js";

export default function profile(bot) {

    bot.hears("👤 Profile", async (ctx) => {

        const user = await getUser(ctx.from.id);

        if (!user) return;

        await ctx.reply(

`👤 Profile

ID: ${user.id}

Name: ${user.firstName}

Username: @${user.username || "None"}

Balance: ₦${user.balance}

Referral Count: ${user.referralCount}

Completed Surveys: ${user.completedSurveys}

Member Since:
${user.createdAt?.toDate?.().toLocaleDateString() || "N/A"}`

        );

    });

}

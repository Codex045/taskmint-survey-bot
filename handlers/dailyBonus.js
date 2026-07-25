import { db } from "../firebase.js";
import { FieldValue } from "firebase-admin/firestore";

const rewards = [20, 30, 40, 50, 60, 80, 100];

export default function dailyBonus(bot) {

    bot.hears("🎁 Daily Bonus", async (ctx) => {

        const ref = db.collection("users").doc(String(ctx.from.id));

        const snap = await ref.get();

        if (!snap.exists) return;

        const user = snap.data();

        const now = Date.now();

        const last = user.lastDailyBonus || 0;

        if (now - last < 86400000) {

            return ctx.reply("🎁 You've already claimed today's bonus.");

        }

        let day = user.dailyBonusDay || 0;

        if (day >= rewards.length) day = 0;

        const reward = rewards[day];

        await ref.update({

            balance: FieldValue.increment(reward),

            totalEarned: FieldValue.increment(reward),

            dailyBonusDay: day + 1,

            lastDailyBonus: now

        });

        await db.collection("transactions").add({

            userId: String(ctx.from.id),

            type: "Daily Bonus",

            amount: reward,

            createdAt: new Date()

        });

        await ctx.reply(
`🎉 Bonus Claimed!

Day ${day + 1}/7

Reward: ₦${reward}`
        );

    });

}

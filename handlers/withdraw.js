import { db } from "../firebase.js";
import { getUser, removeBalance } from "../database/users.js";
import config from "../config.js";

const waiting = {};

export default function withdraw(bot) {

    bot.hears("💸 Withdraw", async (ctx) => {

        const user = await getUser(ctx.from.id);

        if (!user) return;

        if (user.balance < config.MIN_WITHDRAW) {

            return ctx.reply(
`❌ Minimum withdrawal is ₦${config.MIN_WITHDRAW}.

Current Balance: ₦${user.balance}`
            );

        }

        waiting[ctx.from.id] = true;

        await ctx.reply(
"Send your bank details in this format:\n\nBank Name\nAccount Number\nAccount Name"
        );

    });

    bot.on("text", async (ctx, next) => {

        if (!waiting[ctx.from.id]) return next();

        waiting[ctx.from.id] = false;

        const lines = ctx.message.text.split("\n");

        if (lines.length < 3) {

            return ctx.reply("Invalid format.");

        }

        const user = await getUser(ctx.from.id);

        await removeBalance(ctx.from.id, user.balance);

        await db.collection("withdrawals").add({

            userId: String(ctx.from.id),

            username: user.username || "",

            amount: user.balance,

            bankName: lines[0],

            accountNumber: lines[1],

            accountName: lines[2],

            status: "pending",

            createdAt: new Date()

        });

        await db.collection("transactions").add({

            userId: String(ctx.from.id),

            type: "Withdrawal",

            amount: user.balance,

            createdAt: new Date()

        });

        await ctx.reply(
`✅ Withdrawal request of ₦${user.balance} submitted successfully.

Waiting for admin approval.`
        );

    });

}

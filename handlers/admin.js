import { Markup } from "telegraf";
import { db } from "../firebase.js";
import config from "../config.js";

export default function admin(bot) {

    bot.hears("🔐 Admin", async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        const users = await db.collection("users").get();

        const withdrawals = await db.collection("withdrawals").where("status","==","pending").get();

        await ctx.reply(

`🛠 TaskMint Admin

👥 Users: ${users.size}

💸 Pending Withdrawals: ${withdrawals.size}

Choose an option.`,

Markup.keyboard([

["📢 Broadcast"],

["💸 Pending Withdrawals"],

["📊 Statistics"],

["🏠 Home"]

]).resize()

        );

    });

    bot.hears("💸 Pending Withdrawals", async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        const snap = await db.collection("withdrawals")

            .where("status","==","pending")

            .get();

        if (snap.empty) {

            return ctx.reply("✅ No pending withdrawals.");

        }

        for (const doc of snap.docs) {

            const w = doc.data();

            await ctx.reply(

`💸 Withdrawal

👤 ${w.accountName}

💰 ₦${w.amount}

🏦 ${w.bankName}

🔢 ${w.accountNumber}`,

Markup.inlineKeyboard([

[

Markup.button.callback("✅ Approve",`approve_${doc.id}`),

Markup.button.callback("❌ Reject",`reject_${doc.id}`)

]

])

            );

        }

    });

    bot.action(/^approve_(.+)/, async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        const id = ctx.match[1];

        await db.collection("withdrawals")

            .doc(id)

            .update({

                status:"approved",

                approvedAt:new Date()

            });

        await ctx.editMessageText("✅ Withdrawal Approved");

    });

    bot.action(/^reject_(.+)/, async (ctx) => {

        if (String(ctx.from.id) !== String(config.ADMIN_ID)) return;

        const id = ctx.match[1];

        const ref = db.collection("withdrawals").doc(id);

        const snap = await ref.get();

        if (!snap.exists) return;

        const w = snap.data();

        await db.collection("users")

            .doc(String(w.userId))

            .update({

                balance:w.amount

            });

        await ref.update({

            status:"rejected",

            rejectedAt:new Date()

        });

        await ctx.editMessageText("❌ Withdrawal Rejected");

    });

}

import { db } from "../firebase.js";

export default function history(bot) {

    bot.hears("📜 History", async (ctx) => {

        const snap = await db
            .collection("transactions")
            .where("userId", "==", String(ctx.from.id))
            .orderBy("createdAt", "desc")
            .limit(15)
            .get();

        if (snap.empty) {
            return ctx.reply("📜 No transactions found.");
        }

        let text = "📜 Transaction History\n\n";

        snap.forEach(doc => {

            const t = doc.data();

            text += `• ${t.type}\n`;

            text += `Amount: ₦${t.amount || t.amountLocal || 0}\n`;

            text += "──────────────\n";

        });

        await ctx.reply(text);

    });

}

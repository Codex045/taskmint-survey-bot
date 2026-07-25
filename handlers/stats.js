import { db } from "../firebase.js";

export default function stats(bot) {

    bot.hears("📊 Statistics", async (ctx) => {

        const users = await db.collection("users").get();
        const transactions = await db.collection("transactions").get();

        let totalEarned = 0;
        let surveys = 0;

        transactions.forEach(doc => {

            const t = doc.data();

            if (t.type === "Survey") {

                surveys++;

                totalEarned += Number(
                    t.amountLocal || t.amount || 0
                );

            }

        });

        await ctx.reply(

`📊 TaskMint Statistics

👥 Users: ${users.size}

📋 Surveys Completed: ${surveys}

💰 Total Paid: ₦${totalEarned}`

        );

    });

}

import express from "express";
import crypto from "crypto";
import { db } from "./firebase.js";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import config from "./config.js";
import { rewardReferral } from "./database/users.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("TaskMint Survey Bot API Running");
});

app.get("/health", (req, res) => {
    res.json({ status: "online" });
});

app.get("/cpx/postback", async (req, res) => {

    try {

        const {
            ext_user_id,
            amount_local,
            amount_usd,
            trans_id,
            status,
            hash,
            type
        } = req.query;

        const verify = crypto
            .createHash("md5")
            .update(`${trans_id}-${config.CPX_SECURITY_HASH}`)
            .digest("hex");

        if (verify !== hash) {
            return res.status(403).send("Invalid Hash");
        }

        const transactionRef = db
            .collection("transactions")
            .doc(String(trans_id));

        const transaction = await transactionRef.get();

        if (transaction.exists && status !== "2") {
            return res.send("OK");
        }

        const userRef = db
            .collection("users")
            .doc(String(ext_user_id));

        if (status === "2") {

            await userRef.update({

                balance: FieldValue.increment(-Number(amount_local)),

                totalEarned: FieldValue.increment(-Number(amount_local))

            });

            await transactionRef.set({

                status: "reversed",

                reversedAt: Timestamp.now()

            }, { merge: true });

            try {

                if (global.bot) {

                    await global.bot.telegram.sendMessage(

                        Number(ext_user_id),

                        `⚠️ A survey reward of ₦${amount_local} has been reversed by CPX Research.`

                    );

                }

            } catch (err) {

                console.error("Telegram notification failed:", err);

            }

            return res.send("OK");

        }

        await userRef.update({

            balance: FieldValue.increment(Number(amount_local)),

            totalEarned: FieldValue.increment(Number(amount_local)),

            completedSurveys: FieldValue.increment(1)

        });

        await transactionRef.set({

            userId: String(ext_user_id),

            transactionId: String(trans_id),

            type: type || "complete",

            amount: Number(amount_local),

            amountUSD: Number(amount_usd || 0),

            status: "completed",

            createdAt: Timestamp.now()

        });

        await rewardReferral(ext_user_id);

        try {

            if (global.bot) {

                await global.bot.telegram.sendMessage(

                    Number(ext_user_id),

                    `🎉 Survey Completed!\n\n💰 Reward: ₦${amount_local}\n\n✅ Your wallet has been updated successfully.\n\nTap 💰 Wallet to view your balance.`

                );

            }

        } catch (err) {

            console.error("Telegram notification failed:", err);

        }

        console.log(
            `Survey Reward → User ${ext_user_id}: ₦${amount_local}`
        );

        res.send("OK");

    } catch (err) {

        console.error(err);

        res.status(500).send("ERROR");

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {

    console.log(`✅ Server Running on ${PORT}`);

});

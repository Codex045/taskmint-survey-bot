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
    res.json({
        status: "online"
    });
});

app.get("/cpx/postback", async (req, res) => {

    try {

        const {
            ext_user_id,
            amount_local,
            amount_usd,
            trans_id,
            status,
            hash
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

        const exists = await transactionRef.get();

        if (exists.exists && status !== "2") {
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

            return res.send("OK");

        }

        await userRef.update({

            balance: FieldValue.increment(Number(amount_local)),

            totalEarned: FieldValue.increment(Number(amount_local)),

            completedSurveys: FieldValue.increment(1)

        });

        await transactionRef.set({

            userId: String(ext_user_id),

            type: "Survey",

            amount: Number(amount_local),

            amountUSD: Number(amount_usd || 0),

            status: "completed",

            createdAt: Timestamp.now()

        });

        await rewardReferral(ext_user_id);

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

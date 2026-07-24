import express from "express";
import crypto from "crypto";

import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase.js";
import config from "./config.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("TaskMint Survey Bot API Running");
});

/*
CPX Research Postback

Example:
https://yourdomain.com/cpx/postback
*/

app.get("/cpx/postback", async (req, res) => {

    try {

        const {
            ext_user_id,
            amount_local,
            trans_id,
            hash
        } = req.query;

        // Verify request
        const verify = crypto
            .createHash("md5")
            .update(
                `${trans_id}-${config.CPX_SECURITY_HASH}`
            )
            .digest("hex");

        if (verify !== hash) {
            return res.status(403).send("Invalid Hash");
        }

        await updateDoc(
            doc(db, "users", String(ext_user_id)),
            {
                balance: increment(Number(amount_local)),
                totalEarned: increment(Number(amount_local)),
                completedSurveys: increment(1)
            }
        );

        console.log(
            `Rewarded User ${ext_user_id} : ₦${amount_local}`
        );

        res.send("OK");

    } catch (err) {

        console.log(err);

        res.status(500).send("ERROR");

    }

});

app.listen(3000, () => {

    console.log("CPX Postback Server Running");

});

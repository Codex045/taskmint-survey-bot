import { db } from "../firebase.js";
import config from "../config.js";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function registerUser(user, referredBy = "") {

    const ref = db.collection("users").doc(String(user.id));

    const snap = await ref.get();

    if (snap.exists) return;

    if (referredBy === String(user.id)) {
        referredBy = "";
    }

    await ref.set({

        id: String(user.id),

        username: user.username || "",

        firstName: user.first_name || "",

        balance: 0,

        totalEarned: 0,

        totalWithdrawn: 0,

        completedSurveys: 0,

        referralCount: 0,

        referredBy: referredBy || "",

        referralPaid: false,

        dailyBonusDay: 0,

        lastDailyBonus: 0,

        createdAt: Timestamp.now(),

        lastLogin: Timestamp.now()

    });

}

export async function updateLogin(userId) {

    await db.collection("users")
        .doc(String(userId))
        .update({

            lastLogin: Timestamp.now()

        });

}

export async function getUser(userId) {

    const snap = await db.collection("users")
        .doc(String(userId))
        .get();

    if (!snap.exists) {

        return null;

    }

    return snap.data();

}

export async function addBalance(userId, amount) {

    await db.collection("users")
        .doc(String(userId))
        .update({

            balance: FieldValue.increment(Number(amount)),

            totalEarned: FieldValue.increment(Number(amount))

        });

}

export async function removeBalance(userId, amount) {

    await db.collection("users")
        .doc(String(userId))
        .update({

            balance: FieldValue.increment(-Number(amount))

        });

}

export async function rewardReferral(userId) {

    const userRef = db.collection("users").doc(String(userId));

    const snap = await userRef.get();

    if (!snap.exists) return;

    const user = snap.data();

    if (user.referralPaid) return;

    if (!user.referredBy) return;

    if ((user.completedSurveys || 0) < 1) return;

    const referrerRef = db.collection("users")
        .doc(String(user.referredBy));

    await referrerRef.update({

        balance: FieldValue.increment(config.REFERRAL_REWARD),

        totalEarned: FieldValue.increment(config.REFERRAL_REWARD),

        referralCount: FieldValue.increment(1)

    });

    await userRef.update({

        referralPaid: true

    });

    await db.collection("transactions").add({

        userId: String(user.referredBy),

        type: "Referral Bonus",

        amount: config.REFERRAL_REWARD,

        fromUser: String(user.id),

        createdAt: Timestamp.now()

    });

}

import { db } from "../firebase.js";

import {
    FieldValue,
    Timestamp
} from "firebase-admin/firestore";

export async function registerUser(user, referredBy = "") {

    const ref = db.collection("users").doc(String(user.id));

    const doc = await ref.get();

    if (doc.exists) return;

    await ref.set({

        id: String(user.id),

        username: user.username || "",

        firstName: user.first_name || "",

        balance: 0,

        totalEarned: 0,

        completedSurveys: 0,

        totalWithdrawn: 0,

        referralCount: 0,

        referredBy,

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

    const doc = await db.collection("users")
        .doc(String(userId))
        .get();

    if (!doc.exists) return null;

    return doc.data();

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

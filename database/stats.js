import { db } from "../firebase.js";
import { FieldValue } from "firebase-admin/firestore";

export async function newUser() {

    await db.collection("stats").doc("global").set({

        users: FieldValue.increment(1)

    }, { merge: true });

}

export async function surveyCompleted(amount) {

    await db.collection("stats").doc("global").set({

        surveys: FieldValue.increment(1),

        earnings: FieldValue.increment(Number(amount))

    }, { merge: true });

}

export async function referralBonus() {

    await db.collection("stats").doc("global").set({

        referrals: FieldValue.increment(1)

    }, { merge: true });

}

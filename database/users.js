import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    increment
} from "firebase/firestore";

import { db } from "../firebase.js";

// Register a new user
export async function registerUser(user, referredBy = "") {

    const ref = doc(db, "users", String(user.id));

    const snap = await getDoc(ref);

    if (snap.exists()) return false;

    await setDoc(ref, {

        id: user.id,

        name: user.first_name || "",

        username: user.username || "",

        balance: 0,

        referrals: 0,

        referredBy: referredBy,

        totalEarned: 0,

        completedSurveys: 0,

        pendingWithdraw: 0,

        status: "active",

        joined: Date.now(),

        lastLogin: Date.now()

    });

    return true;

}

// Get user
export async function getUser(id) {

    const ref = doc(db, "users", String(id));

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return snap.data();

}

// Update last login
export async function updateLogin(id) {

    await updateDoc(doc(db, "users", String(id)), {

        lastLogin: Date.now()

    });

}

// Add balance
export async function addBalance(id, amount) {

    await updateDoc(doc(db, "users", String(id)), {

        balance: increment(amount),

        totalEarned: increment(amount)

    });

}

// Remove balance
export async function removeBalance(id, amount) {

    await updateDoc(doc(db, "users", String(id)), {

        balance: increment(-amount)

    });

}

// Add referral
export async function addReferral(id) {

    await updateDoc(doc(db, "users", String(id)), {

        referrals: increment(1)

    });

}

// Add completed survey
export async function addSurvey(id) {

    await updateDoc(doc(db, "users", String(id)), {

        completedSurveys: increment(1)

    });

}

// Update username
export async function updateUsername(id, username) {

    await updateDoc(doc(db, "users", String(id)), {

        username: username

    });

}

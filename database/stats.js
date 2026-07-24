import {
collection,
getDocs
} from "firebase/firestore";

import {db} from "../firebase.js";

export async function totalUsers(){

const snap=await getDocs(collection(db,"users"));

return snap.size;

}

export async function totalWithdrawals(){

const snap=await getDocs(collection(db,"withdrawals"));

return snap.size;

}

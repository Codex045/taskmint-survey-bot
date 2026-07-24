import {
collection,
addDoc,
Timestamp
} from "firebase/firestore";

import {db} from "../firebase.js";

export async function createWithdrawal(data){

await addDoc(

collection(db,"withdrawals"),

{

userId:data.userId,

amount:data.amount,

status:"Pending",

createdAt:Timestamp.now()

}

);

}9


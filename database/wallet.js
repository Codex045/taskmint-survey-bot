import {
doc,
updateDoc,
getDoc
} from "firebase/firestore";

import {db} from "../firebase.js";

export async function getBalance(id){

const snap=await getDoc(doc(db,"users",String(id)));

if(!snap.exists()) return 0;

return snap.data().balance;

}

export async function deposit(id,amount){

const ref=doc(db,"users",String(id));

const snap=await getDoc(ref);

const bal=snap.data().balance;

await updateDoc(ref,{

balance:bal+amount

});

}

export async function withdraw(id,amount){

const ref=doc(db,"users",String(id));

const snap=await getDoc(ref);

const bal=snap.data().balance;

await updateDoc(ref,{

balance:bal-amount

});

}

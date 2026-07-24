import{
doc,
updateDoc,
increment
}from"firebase/firestore";

import{db}from"../firebase.js";

export async function addReferral(id){

await updateDoc(doc(db,"users",String(id)),{

referrals:increment(1)

});

}

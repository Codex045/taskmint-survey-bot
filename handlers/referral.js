import {
doc,
getDoc,
updateDoc,
increment
} from "firebase/firestore";

import { db } from "../firebase.js";

export default function(bot){

// Invite button
bot.hears("👥 Invite Friends", async (ctx)=>{

const link=`https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`;

await ctx.reply(

`👥 Invite Friends

Invite your friends and earn ₦50 for every friend that joins and starts the bot.

🔗 Your Referral Link

${link}`

);

});

// Referral registration
bot.start(async(ctx)=>{

const text=ctx.message.text;

if(!text.includes(" ")) return;

const referrerId=text.split(" ")[1];

if(referrerId==ctx.from.id) return;

const userRef=doc(db,"users",String(ctx.from.id));

const userSnap=await getDoc(userRef);

// Already registered
if(userSnap.exists()) return;

const refRef=doc(db,"users",String(referrerId));

const refSnap=await getDoc(refRef);

if(!refSnap.exists()) return;

await updateDoc(refRef,{

referrals:increment(1),

balance:increment(50)

});

});

}

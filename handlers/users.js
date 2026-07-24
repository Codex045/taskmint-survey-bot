import config from "../config.js";

import {
collection,
getDocs
} from "firebase/firestore";

import {db} from "../firebase.js";

export default function(bot){

bot.hears("👥 Users",async(ctx)=>{

if(String(ctx.from.id)!==String(config.ADMIN_ID)) return;

const snap=await getDocs(collection(db,"users"));

let text="👥 Registered Users\n\n";

snap.forEach(doc=>{

const user=doc.data();

text+=`${user.name}\n@${user.username}\n\n`;

});

ctx.reply(text);

});

}

import config from "../config.js";

import {
registerUser,
updateLogin
} from "../database/users.js";

import { Markup } from "telegraf";

export default async function(ctx){

const args=ctx.message.text.split(" ");

let referredBy="";

if(args.length>1){

referredBy=args[1];

}

await registerUser(ctx.from,referredBy);

await updateLogin(ctx.from.id);

const isAdmin=String(ctx.from.id)===String(config.ADMIN_ID);

const keyboard=isAdmin

?Markup.keyboard([

["📋 Surveys"],

["💰 Wallet","💸 Withdraw"],

["👤 Profile","👥 Invite Friends"],

["📞 Support","🔐 Admin"]

]).resize()

:Markup.keyboard([

["📋 Surveys"],

["💰 Wallet","💸 Withdraw"],

["👤 Profile","👥 Invite Friends"],

["📞 Support"]

]).resize();

await ctx.reply(

`👋 Welcome @${ctx.from.username||ctx.from.first_name}

💰 Earn money by completing surveys.

👇 Choose an option below.`,

keyboard

);

}

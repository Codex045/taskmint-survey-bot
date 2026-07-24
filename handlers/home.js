import config from "../config.js";

import { Markup } from "telegraf";

export default function(bot){

bot.hears("🏠 Home",async(ctx)=>{

const admin=String(ctx.from.id)===String(config.ADMIN_ID);

const keyboard=admin

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

ctx.reply("🏠 Home",keyboard);

});

}

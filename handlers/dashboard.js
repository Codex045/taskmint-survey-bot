import config from "../config.js";

import {
totalUsers,
totalWithdrawals
} from "../database/stats.js";

export default function(bot){

bot.hears("📊 Dashboard",async(ctx)=>{

if(String(ctx.from.id)!==String(config.ADMIN_ID)) return;

const users=await totalUsers();

const withdrawals=await totalWithdrawals();

ctx.reply(

`📊 TaskMint Dashboard

👥 Users : ${users}

💸 Withdrawals : ${withdrawals}

🟢 Status : Online`

);

});

}

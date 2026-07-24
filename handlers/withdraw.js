import {getBalance} from "../database/wallet.js";
import {createWithdrawal} from "../database/withdrawals.js";

export default function(bot){

bot.hears("💸 Withdraw",async(ctx)=>{

const balance=await getBalance(ctx.from.id);

if(balance<2500){

return ctx.reply(

"❌ Minimum withdrawal is ₦2,500."

);

}

await createWithdrawal({

userId:ctx.from.id,

amount:balance

});

ctx.reply(

`✅ Withdrawal Request Sent

Amount: ₦${balance}

Status: Pending`

);

});

}

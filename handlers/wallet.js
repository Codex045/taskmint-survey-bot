import { getBalance } from "../database/wallet.js";

export default function (bot) {

bot.hears("💰 Wallet", async (ctx) => {

const balance = await getBalance(ctx.from.id);

ctx.reply(

`💰 Your Wallet

💵 Balance : ₦${Number(balance).toLocaleString()}

📋 Complete CPX Research surveys to increase your earnings.

💸 Minimum Withdrawal : ₦2,500`

);

});

}

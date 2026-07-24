export default function(bot){

bot.command("help",async(ctx)=>{

ctx.reply(

`📖 Help

📋 Surveys
Complete surveys and earn.

💰 Wallet
View your balance.

💸 Withdraw
Request payment.

👥 Invite Friends
Earn referral bonuses.

📞 Support
Contact support anytime.`

);

});

}

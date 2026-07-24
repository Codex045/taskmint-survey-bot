import config from "../config.js";

export default function(bot){

bot.hears("⚙ Settings",async(ctx)=>{

if(String(ctx.from.id)!==String(config.ADMIN_ID)) return;

ctx.reply(

`⚙ Settings

💸 Referral Bonus : ₦50

💰 Minimum Withdraw : ₦2500

📊 Bot Status : Online`

);

});

}

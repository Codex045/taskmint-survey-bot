import config from "../config.js";

export default function(bot){

bot.command("broadcast",async(ctx)=>{

if(String(ctx.from.id)!==String(config.ADMIN_ID)) return;

ctx.reply(

"Send the message you want to broadcast."

);

});

}

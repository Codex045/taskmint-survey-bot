import { Markup } from "telegraf";
import { createSurveyLink } from "../services/cpx.js";

export default function(bot){

bot.hears("📋 Surveys",async(ctx)=>{

const surveyLink=createSurveyLink(ctx.from);

await ctx.reply(

`📋 CPX Research

Complete surveys and earn rewards.

Click the button below.`,

Markup.inlineKeyboard([

Markup.button.url(
"🚀 Open Survey Wall",
surveyLink
)

])

);

});

}

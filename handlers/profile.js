import { getUser } from "../database/users.js";

export default async function(ctx){

const user=await getUser(ctx.from.id);

ctx.reply(

`👤 Profile

🆔 ${user.id}

👤 ${user.name}

📛 @${user.username}

💰 Balance : ₦${user.balance}

👥 Referrals : ${user.referrals}

📋 Surveys : ${user.completedSurveys}

📅 Joined

${new Date(user.joined).toLocaleDateString()}`

);

}

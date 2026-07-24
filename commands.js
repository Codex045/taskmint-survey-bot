import start from "./handlers/start.js";
import profile from "./handlers/profile.js";
import menu from "./handlers/menu.js";
import admin from "./handlers/admin.js";
import surveys from "./handlers/surveys.js";
import withdraw from "./handlers/withdraw.js";
import referral from "./handlers/referral.js";
import wallet from "./handlers/wallet.js";
import support from "./handlers/support.js";
import dashboard from "./handlers/dashboard.js";
import users from "./handlers/users.js";
import broadcast from "./handlers/broadcast.js";
import help from "./handlers/help.js";
import home from "./handlers/home.js";
import settings from "./handlers/settings.js";

export default function(bot){

bot.start(start);

bot.hears("👤 Profile",profile);

menu(bot);

admin(bot);

surveys(bot);

withdraw(bot);

referral(bot);

wallet(bot);

support(bot);

dashboard(bot);

users(bot);

broadcast(bot);

home(bot);

settings(bot);

help(bot);

}

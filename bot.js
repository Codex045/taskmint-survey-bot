import { Telegraf } from "telegraf";
import config from "./config.js";

import "./server.js";

import start from "./handlers/start.js";
import surveys from "./handlers/surveys.js";
import wallet from "./handlers/wallet.js";
import withdraw from "./handlers/withdraw.js";
import profile from "./handlers/profile.js";
import invite from "./handlers/invite.js";
import history from "./handlers/history.js";
import dailyBonus from "./handlers/dailyBonus.js";
import support from "./handlers/support.js";
import admin from "./handlers/admin.js";
import broadcast from "./handlers/broadcast.js";
import maintenance from "./handlers/maintenance.js";
import stats from "./handlers/stats.js";

const bot = new Telegraf(config.BOT_TOKEN);
global.bot = bot;

bot.start(start);

maintenance(bot);
admin(bot);
broadcast(bot);
stats(bot);

surveys(bot);
wallet(bot);
withdraw(bot);
profile(bot);
invite(bot);
history(bot);
dailyBonus(bot);
support(bot);

bot.launch();

console.log("🤖 Survey Bot Online");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

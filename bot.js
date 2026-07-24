
import "./server.js";

import {Telegraf} from "telegraf";

import config from "./config.js";

import commands from "./commands.js";

const bot=new Telegraf(config.BOT_TOKEN);

commands(bot);

bot.catch(console.error);

bot.launch();

console.log("TaskMint Survey Bot Online");

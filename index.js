"use strict";

const startTime = new Date();

const Discord = require("discord.js");
const { version } = require("./package.json");
const {
  author,
  authorId,
  help,
  error,
  pre,
  pricelist
} = require("./info.json");

const helpEmbed = {
  color: 0x0eab28,
  title: "StoreBot Help",
  author: {
    name: "StoreBot",
    icon_url: "https://s8.gifyu.com/images/rBt.png"
  },
  description:
    "This is the help page of StoreBot that list multiple usefull commands. To reach this page type **!help**.",
  thumbnail: {
    url: "https://s8.gifyu.com/images/help-3.png"
  },
  fields: {
    name: "Commands list",
    value: help.join("")
  },
  timestamp: new Date(),
  footer: {
    text: "© PremiumBD "
  }
};

function stat() {
  let s = "Running for ";
  let t = new Date() - startTime;
  if (t >= 86400000) {
    let d = Math.floor(t / 86400000);
    t -= d * 86400000;
    s += d + " day" + (d > 1 ? "s " : " ");
  }
  if (t >= 3600000) {
    let h = Math.floor(t / 3600000);
    t -= h * 3600000;
    s += h + " hour" + (h > 1 ? "s " : " ");
  }
  if (t >= 60000) {
    let m = Math.floor(t / 60000);
    t -= m * 60000;
    s += m + " miniute" + (m > 1 ? "s " : " ");
  }
  if (t >= 1000) {
    let se = t / 1000;
    s += se + " second" + (se > 1 ? "s" : "");
  }
  return s;
}

function reminder(text) {
  client.users.cache.get(authorId.toString()).send("Reminder: " + text);
}

const Cmds = new Map([
  ["test", "StoreBot is running!"],
  ["version", "Version " + version],
  ["about", "StoreBot " + version + "\nAuthor: " + author],
  //['list', ''],
  //['pricelist', ''],
  ["help", { embed: helpEmbed }]
  //['buy', '']
]);

const client = new Discord.Client();

client.once("ready", () => {
  console.log("StoreBot is Ready!");
});

client.on("message", msg => {
  let st = process.hrtime();

  if (msg.content.startsWith(">") && msg.author.toString() == author) {
    const str = msg.content.slice(1);
    console.log(`${msg.author.username}: ${str}`);
    const arg = str.split(/ +/);
    const fir = arg[0];

    if ("announce".startsWith(fir)) {
      if (arg.length < 3)
        msg.channel.send("This command should have at least 3 arguments.");
      else
        client.channels.cache
          .find(channel => channel.name === arg[1])
          .send(arg.slice(2).join(" "));
    } else if ("remind".startsWith(fir)) {
      if (arg.length < 3) {
        msg.channel.send(
          "```\nPersonal command: remind\nUsage: >remind text time\nExample:\n>remind giveaway 1d22h55m10s```"
        );
        return;
      }

      const tstr = arg[arg.length - 1].toLowerCase();

      const numA = "0123456789";
      let numStr = "";
      let t = 0;

      [...tstr].forEach(c => {
        if (numA.includes(c)) {
          numStr += c;
        } else {
          if (c == "s") t += numStr.toString();
          else if (c == "m") t += numStr.toString() * 60;
          else if (c == "h") t += numStr.toString() * 3600;
          else if (c == "d") t += numStr.toString() * 86400;
          numStr = "";
        }
      });

      arg.pop();

      setTimeout(
        reminder,
        1000 * t,
        arg.slice(1).join(" ") + " `" + tstr + " ago`"
      );
    }

    return;
  }

  if (!msg.content.startsWith(pre) || msg.author.bot) return;

  const str = msg.content.slice(1);
  console.log(`${msg.author.username}: ${str}`);
  const arg = str.toLowerCase().split(/ +/);
  const fir = arg[0];

  if (fir == "status") {
    msg.channel.send(stat());
  } else if (Cmds.has(fir)) {
    msg.channel.send(Cmds.get(fir));
  } else {
    msg.channel.send(`${msg.author} said: ${str}`);
  }

  let ed = process.hrtime(st);
  msg.channel.send(`processing time for ${fir} is ${ed[1] / 1000000}ms`);
});

client.login(process.env.discord_token);

const Discord = require('discord.js');
const {version} = require('./package.json');

const client = new Discord.Client();

const error = 'No such command. See help.\nType `!help`';
const author = '<@577491473100963840>';
const pre = '!';
const pricelist = "";
var arg;


client.once('ready', () => {
    console.log('StoreBot is Ready!');
});


const Cmds = new Map([
  ["test", "StoreBot is running!"],
  ["version", "Version " + version],
  ["about", "StoreBot " + version + "\nAuthor: " + author],
  //["list", ""],
  //["pricelist", ""],
  ["help", "StoreBot v" + version + "\nThe bot is on pre-Alpha testing stage.\nAvailable commands: help, test, version, about."],
  //["buy", ""]
]);


client.on('message', msg => {

    if(!msg.content.startsWith(pre) || msg.author.bot) return;

    var str = msg.content.slice(1);
    console.log(`${msg.author.username}: ${str}`);
    arg = str.toLowerCase().split(/ +/);

    if(Cmds.has(arg[0])) {
      msg.channel.send(Cmds.get(arg[0]));
    } else {
      msg.channel.send(`${msg.author} said: ${str}`);
    }

});


client.login('Nzc0MzIxMzkzNjM0MTE1NjA2.X6WE_g.V6_rMfNAbEroYj5FmMD5MKao7Zw');

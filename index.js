'use strict';

const Discord = require('discord.js');
const secrets = require('./secrets.json');
const {
  version
} = require('./package.json');
const {
  author,
  help,
  error,
  pre,
  pricelist
} = require('./info.json');

const client = new Discord.Client();

const Cmds = new Map([
  ['test', 'StoreBot is running!'],
  ['version', 'Version ' + version],
  ['about', 'StoreBot ' + version + '\nAuthor: ' + author],
  //['list', ''],
  //['pricelist', ''],
  ['help', 'StoreBot v' + version + help.join('')],
  //['buy', '']
]);

client.once('ready', () => {
  console.log('StoreBot is Ready!');
});

client.on('message', msg => {
  let t = new Date();
  if (!msg.content.startsWith(pre) || msg.author.bot) return;

  const str = msg.content.slice(1);
  console.log(`${msg.author.username}: ${str}`);
  const arg = str.toLowerCase().split(/ +/);
  const fir = arg[0];

  if (fir == 'announce' && msg.author.toString() == author) {
    if(arg.length < 3) {
      msg.channel.send('This command should have at least 3 arguments.');
    } else
    client.channels.cache
    .find(channel => channel.name === arg[1])
    .send(arg.slice(2).join(' '));
  }
  
  else if (Cmds.has(fir)) {
    msg.channel.send(Cmds.get(fir));
  } else {
    msg.channel.send(`${msg.author} said: ${str}`);
  }
  
  msg.channel.send(`processing time for ${fir} is ${new Date()-t}ms`);
});


client.login(secrets.discord.token);

'use strict';

const startTime = new Date();

const Discord = require('discord.js');
const secrets = require('./secrets.json');
const { version } = require('./package.json');
const {
  author,
  help,
  error,
  pre,
  pricelist
} = require('./info.json');

const client = new Discord.Client();

function stat() {
  let s = 'Running for ';
  let t = new Date() - startTime;
  if (t >= 86400000) {
    let d = Math.floor(t / 86400000);
    t -= d * 86400000;
    s += d + ' day' + ((d > 1) ? 's ' : ' ');
  } if (t >= 3600000) {
    let h = Math.floor(t / 3600000);
    t -= h * 3600000;
    s += h + ' hour' + ((h > 1) ? 's ' : ' ');
  } if (t >= 60000) {
    let m = Math.floor(t / 60000);
    t -= m * 60000;
    s += m + ' miniute' + ((m > 1) ? 's ' : ' ');
  } if (t >= 1000) {
    let se = t / 1000;
    s += se + ' second' + ((se > 1) ? 's' : '');
  }
  return s;
}

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
  console.log(stat());
});

client.on('message', msg => {
  let st = process.hrtime();
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
  
  else if(fir == 'status') {
    msg.channel.send(stat());
  }
  
  else if (Cmds.has(fir)) {
    msg.channel.send(Cmds.get(fir));
  } else {
    msg.channel.send(`${msg.author} said: ${str}`);
  }
  
  let ed = process.hrtime(st);
  msg.channel.send(`processing time for ${fir} is ${ed[1] / 1000000}ms`);
});


client.login(secrets.discord.token);

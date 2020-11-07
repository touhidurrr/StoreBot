const Discord = require('discord.js');
const {version} = require('./package.json');
const {author, help, error, pre, pricelist} = require('./info.json');

const client = new Discord.Client();

const Cmds = new Map([
  ['test', 'StoreBot is running!'],
  ['version', 'Version ' + version],
  ['about', 'StoreBot ' + version + '\nAuthor: ' + author],
  //['list', ''],
  //['pricelist', ''],
  ['help', 'StoreBot v' + version + help],
  //['buy', '']
]);

client.once('ready', () => {
    console.log('StoreBot is Ready!');
});

client.on('message', msg => {

    if(!msg.content.startsWith(pre) || msg.author.bot) return;

    const str = msg.content.slice(1);
    console.log(`${msg.author.username}: ${str}`);
    const arg = str.toLowerCase().split(/ +/);
    const fir = arg[0];

    if(Cmds.has(fir)) {
      msg.channel.send(Cmds.get(fir));
    } else {
      msg.channel.send(`${msg.author} said: ${str}`);
    }

});


client.login('Nzc0MzIxMzkzNjM0MTE1NjA2.X6WE_g.V6_rMfNAbEroYj5FmMD5MKao7Zw');

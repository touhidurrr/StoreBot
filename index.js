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
    console.log(Comds);
    console.log('test' in Cmds);
});

client.on('message', msg => {

    if(!msg.content.startsWith(pre) || msg.author.bot) return;

    const str = msg.content.slice(1);
    console.log(`${msg.author.username}: ${str}`);
    const arg = str.toLowerCase().split(/ +/);

    if(arg[0] in Cmds) {
      msg.channel.send(Cmds.get(arg[0]));
    } else {
      msg.channel.send(`${msg.author} said: ${str}`);
    }

});


client.login('Nzc0MzIxMzkzNjM0MTE1NjA2.X6WE_g.V6_rMfNAbEroYj5FmMD5MKao7Zw');

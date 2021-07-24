import dotenv from 'dotenv';

dotenv.config();

import Discord from 'discord.js';

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  // msg.author
  // if (msg.content === 'ping') {
  //   msg.reply('Pong!');
  // }

  // Ignore messages unless start with /
  if (!msg.content.startsWith('/')) return;

  if (msg.content === '/hello') {
    try {
      await msg.react('👋');
      await msg.reply('Hello! :)');
    } catch (error) {
      console.error('Something broke:', error);
    }
  }
});


//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

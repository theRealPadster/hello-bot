import dotenv from 'dotenv';

dotenv.config();

import Discord from 'discord.js';

const client = new Discord.Client();

const PREFIX = '/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {

  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (command === 'hello') {
    try {
      await msg.react('👋');
      await msg.channel.send(`Hello ${msg.author}! :)`);
      // await msg.reply(`Hello @${msg.author.username}! :)`);

    } catch (error) {
      console.error('Something broke:', error)
    }
  }	else if (command === 'args-info') {
		if (!args.length) {
			return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
		}

		msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN);

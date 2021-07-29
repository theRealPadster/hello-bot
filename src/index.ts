import dotenv from 'dotenv';
dotenv.config();

import Discord from 'discord.js';
import { fillInName, getRandomArrayItem } from './lib/utils';

import COMPLIMENTS from './data/compliments.json';
import INSULTS from './data/insults.json';

const { COMPLIMENT_USERS } = process.env;
const COMPLIMENT_USERS_ARR: string[] = COMPLIMENT_USERS ? (JSON.parse(COMPLIMENT_USERS)) : [ 'Sorry, no compliments for $1' ];

const client = new Discord.Client();

const PREFIX = '/';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {

  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  // /hello
  if (command === 'hello') {
    try {
      await msg.react('👋');
      await msg.channel.send(`Hello ${msg.author}! :)`);
      // await msg.reply(`Hello @${msg.author.username}! :)`);

    } catch (error) {
      console.error('Something broke:', error)
    }
  } // /compliment
  else if (command === 'compliment') {
    // Use mentioned user or the author if none
    const user = msg.mentions.users.first() || msg.author;
    const response = getComplimentOrInsult(user);
    msg.channel.send(response);
  }	// /args-info
  else if (command === 'args-info') {
		if (!args.length) {
			return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
		}

		msg.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
});

const getComplimentOrInsult = (author: Discord.User) => {
  // Default to insults if not in compliments list
  const relevantList = COMPLIMENT_USERS_ARR.includes(author.username) ? COMPLIMENTS : INSULTS;

  let response: string = getRandomArrayItem(relevantList);
  response = fillInName(response, author);
  return response;
};

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN);

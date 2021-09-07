// TODO: can I just grab the types?
import Discord from 'discord.js'

import {
  fillInName,
  getRandomArrayItem,
  getAuthorDisplayName,
  generateGif
} from './utils';

import COMPLIMENTS from '../data/compliments.json';
import INSULTS from '../data/insults.json';

const { COMPLIMENT_USERS } = process.env;
const COMPLIMENT_USERS_ARR: string[] = COMPLIMENT_USERS
  ? JSON.parse(COMPLIMENT_USERS)
  : [ 'Sorry, no compliments for $1' ];

/**
 * Get a random compliment or insult for user based on whitelist
 * @param author User to compliment/insult
 * @returns {string} The response to send
 */
export const getComplimentOrInsult = (author: Discord.User) => {
  // Default to insults if not in compliments list
  const relevantList = COMPLIMENT_USERS_ARR.includes(author.username) ? COMPLIMENTS : INSULTS;

  let response: string = getRandomArrayItem(relevantList);
  response = fillInName(response, author);
  return response;
};

/**
 * Check a message for a gif and react if found.
 * @param msg The message
 * @returns {boolean} True or false based on if gif was found and message sent
 */
export const checkAndReactToGifs = (msg: Discord.Message) => {
  const embed = msg.embeds?.[0];
  if (embed?.type === 'gifv') {
    msg.channel.send('Haha, nice gif! 😂');
    return true;
  } else {
    return false;
  }
};

/**
 * Eject a user
 * @param user User to eject
 * @param msg Source message to grab guild, display name, etc from
 */
export const eject = async (user: Discord.User, msg: Discord.Message) => {
  const nick = await getAuthorDisplayName(user, msg);
  const response = '$1 has been ejected'.replace('$1', nick);

  const gifStream = generateGif(response);
  const attachment = new Discord.MessageAttachment(gifStream, 'eject.gif');
  // const attachment = new Discord.MessageAttachment('https://c.tenor.com/4yWg64DBO1AAAAAC/littlebigwhale-among-us.gif');

  msg.channel.send(attachment);
  msg.channel.send(response);
  return true;
};

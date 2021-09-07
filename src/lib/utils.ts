// TODO: can I just grab the types?
import Discord from 'discord.js';

import gm from 'gm';
import path from 'path';

export const fillInName = (str: string, author: Discord.User) => {
  return str.replace('$1', `<@${author.id}>`);
};

export const getRandomArrayItem = (arr: any[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const getAuthorDisplayName = async (user: Discord.User, msg: Discord.Message) => {
  const member = await msg.guild.member(user);
  console.log(member);
  return member ? member.nickname : user.username;
};

// TODO: can I make this any faster?
export const generateGif = (caption: string) => {
  // Source: Tenor
  const GIF_PATH = path.join(__dirname, '../../src/data/littlebigwhale-among-us.gif');
  // Source: Google Fonts
  const FONT_PATH = path.join(__dirname, '../../src/data/Roboto/Roboto-Medium.ttf');

  const stream = gm(GIF_PATH)
    // .stroke('#000000')
    .fill('#ffffff')
    .font(FONT_PATH, 28)
    .dither(false)
    .drawText(0, 20, caption, 'South')
    .stream();

    return stream;
};

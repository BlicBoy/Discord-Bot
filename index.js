const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
client.on("ready",()=>{
  console.log(`Bot ON!`)
  client.user.setActivity(
    `Prefix ! | BlicBoy `, {type: "LISTENING"}
  );
});

client.on("message", function(message){
if(message.author.bot) return;
if(!message.content.startsWith(config.prefix)) return;
const commandBody = message.content.slice(config.prefix.length);
const args = commandBody.split(' ');
const command = args.shift().toLowerCase();
if(command === "ping"){
    const timeTaken = Date.now() - message.createdTimestamp;
    console.log("Comando ping executado!Por: "+message.author.username);
    message.reply(`Pong! this message had a latency if ${timeTaken}ms.`);
    
}
else if(command === "soma"){
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter+=x);
    console.log("Comando soma executado! "+ message.author.username);
    message.reply(`A soma é ${sum}`);
}
else if(command === "avatar"){
  if(!message.mentions.users.size){
    message.channel.send('Ninguém foi mencionado');
    return;
  }else{
      const user = message.mentions.users.first() || message.author;
      const avatarEmbed = new Discord.MessageEmbed()
      .setAuthor(user.username)
      .setImage(user.displayAvatarURL());
    console.log("Avatar carregado! "+ message.author.username);
      message.channel.send(avatarEmbed);
  }
}else if(command === "fruits"){
      message.react('🍎')
			.then(() => message.react('🍊'))
			.then(() => message.react('🍇'))
			.catch(() => console.error('One of the emojis failed to react.'));
      console.log("Frutas! "+ message.author);
}else if(command === "server"){
  message.reply(`Server name: ${message.guild.name}\nCom ${message.guild.memberCount}`);
  console.log("sever! "+ message.author.username);
}else if(command === "comandos"){
  try{
    message.author.send("ping;\nsoma;\navatar;\nfruits;\nserver");
  }catch{}
}else if(command === "role"){
  let role = message.guild.roles.cache.find(r => r.id === "1001909245421305896");

  let user = message.mentions.members.first();

  user.roles.add(role);
  message.channel.send(`${user} com role!`);
  console.log("Com tag")

}
});



client.login(config.BOT_TOKEN);



//1001909245421305896 -> teste cargo
const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const commands = require(config.paths.commands)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', (msg) => {
  if (msg.author.bot) return

  const content = msg.content.trim().toLowerCase()
  if (!content.startsWith(config.prefix)) return

  // Separate name of command and arguments to make
  // it easier to work with
  const [name, ...args] = content
    .slice(config.prefix.length)
    .replace(/\s+?/g, ' ')
    .trim()
    .split(' ')

  commands.try({ name, args, msg })
  // Will reply to the sender of the command
  // ... Eventually
  .then(res => msg.channel.send(...res))
  .catch((error) => {
    console.log(`command ${name} with [${args.toString()}] failed`)
    console.log(error)
  })
})

client.login(config.token)

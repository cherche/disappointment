const commands = {
  help: {
    description: 'Opens this menu.'
  },
  ping: {
    description: 'Pong!',
    use: () => ['pong']
  }
}

const descs = Object
  .keys(commands)
  .map((key) => ({
    name: key,
    desc: commands[key].description
  }))

const descsStr = descs.map(({ name, desc }) => `\n\`${name}\`: ${desc}`)

commands.help.use = ({ msg }) => [descsStr, { reply: msg.author }]

exports.try = ({ name, args, msg }) => new Promise((resolve) => {
  const command = commands[name]
  if (!command) return console.log(`command ${name} does not exist`)

  resolve(command.use({ args, msg }))
})

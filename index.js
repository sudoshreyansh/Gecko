import 'dotenv/config' 
import * as discord from 'discord.js'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { commands, functions } from './commands.js'

async function setup() {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)

    let previousCommands = await rest.get(
        Routes.applicationGuildCommands(process.env.ID, process.env.GUILD_ID)
    )
    let promises = [];
    for (const command of previousCommands) {
        const url = `${Routes.applicationGuildCommands(process.env.ID, process.env.GUILD_ID)}/${command.id}`;
        promises.push(rest.delete(url));
    }
    await Promise.all(promises);
    console.log('Deleted previous guild slash commands.')

    
    previousCommands = await rest.get(
        Routes.applicationCommands(process.env.ID, process.env.GUILD_ID)
    )
    promises = [];
    for (const command of previousCommands) {
        const url = `${Routes.applicationCommands(process.env.ID, process.env.GUILD_ID)}/${command.id}`;
        promises.push(rest.delete(url));
    }
    await Promise.all(promises);
    console.log('Deleted previous global slash commands.')


    await rest.put(
        Routes.applicationGuildCommands(process.env.ID, process.env.GUILD_ID),
        { body: commands }
    )
    console.log('Successfully registered slash commands.')
    
    const client = new discord.Client({
        intents: [discord.GatewayIntentBits.Guilds]
    })

    client.once('ready', async () => {
        console.log('Bot ready')
    })

    client.on('interactionCreate', async interaction => {
        if ( !interaction.isCommand() ) return
        const name = interaction.commandName

        console.log('Interaction received: ', name)
        if ( functions[name] ) {
            try {
                await functions[name](interaction)
            } catch ( err ) {
                await interaction.reply({
                    content: 'The bot ran into and issue.'
                })
            }
        } else {
            await interaction.reply({
                content: 'Hello, you tried to do something funny.'
            })
        }
    })

    client.on('error', console.log)
    client.login(process.env.TOKEN)
}

setup().catch(console.log)
import { SlashCommandBuilder } from '@discordjs/builders'
import geckoFunction from './commands/gecko.js'

export const commands = [
    new SlashCommandBuilder()
        .setName('gecko')
        .setDescription('Fetch current price')
        .addStringOption(option => (
            option
            .setName('currency')
            .setDescription('The currency to fetch for.')
            .setRequired(true)
        ))
]

export const functions = {
    'gecko': geckoFunction
}
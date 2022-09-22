import { SlashCommandBuilder } from '@discordjs/builders'
import geckoFunction from './commands/gecko.js'
import getCodeFunction from './commands/getCode.js'

export const commands = [
    new SlashCommandBuilder()
        .setName('gecko')
        .setDescription('Fetch current price')
        .addStringOption(option => (
            option
            .setName('crypto')
            .setDescription('The currency to fetch for.')
            .setRequired(true)
        ))
        .addStringOption(option => (
            option
            .setName('fiat')
            .setDescription('The currency unit to convert to.')
            .setRequired(true)
        )),
    new SlashCommandBuilder()
        .setName('getcode')
        .setDescription('search for crypto currency code')
        .addStringOption(option => (
            option
            .setName('query')
            .setDescription('The currency to search for')
            .setRequired(true)
        )) 
]

export const functions = {
    'gecko': geckoFunction,
    'getcode': getCodeFunction
}
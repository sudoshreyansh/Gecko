import { SlashCommandBuilder } from '@discordjs/builders'
import geckoFunction from './commands/gecko.js'
import graphFunction from './commands/graph.js'

export const commands = [
    new SlashCommandBuilder()
        .setName('gecko')
        .setDescription('Fetch current price')
        .addStringOption(option => (
            option
            .setName('currency')
            .setDescription('The currency to fetch for.')
            .setRequired(true)
        )),
    new SlashCommandBuilder()
        .setName('graph')
        .setDescription('Display a community-driven currency graph')
        .addStringOption(option => (
            option
            .setName('currency')
            .setDescription('The currency to fetch for.')
            .setRequired(true)
        ))
]

export const functions = {
    'gecko': geckoFunction,
    'graph': graphFunction
}
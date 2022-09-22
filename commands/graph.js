import axios from 'axios'
import {  AttachmentBuilder } from 'discord.js'
import graphRenderer from '../utils/graph-render.js'

export default async function (interaction) {
    const currency = await interaction.options.get('currency').value
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=7`)
    const image = await graphRenderer(res.data.prices)

    await interaction.reply({
        files: [new AttachmentBuilder(image)]
    })
}
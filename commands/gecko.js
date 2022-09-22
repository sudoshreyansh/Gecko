export default async function (interaction) {
    const currency = await interaction.options.get('currency').value
    await interaction.reply({
        content: `Hello, you searched for ${currency}`
    })
}
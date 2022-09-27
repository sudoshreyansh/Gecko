import axios from "axios";

export default async function (interaction) {
  const query = await interaction.options.get("query").value;

  await interaction.deferReply();
  try {
    const {
      data: { coins },
    } = await axios.get(`${process.env.API_URL}/search?query=${query}`);

    const coinIds = coins.map(({ id }) => id).join(",");
    const { data: coinPrices } = await axios.get(
      `${process.env.API_URL}/simple/price?ids=${coinIds}&vs_currencies=usd`
    );

    let content = `Here are the results for '${query}':\n`;
    for (const coin of coins) {
      content += `- ${coin.name} (${coin.symbol}) - 1 ${coin.symbol} = ${
        coinPrices[coin.id].usd
      } USD\n`;
    }

    interaction.editReply({
      content,
    });
  } catch (err) {
    console.log(err);
    await interaction.editReply({
      content: `Oops Some Error Occured`,
    });
  }
}

import axios from 'axios';

export default async function (interaction) {
    const cryptoCurrency = await interaction.options.get('crypto').value
    const fiatCurrency = await interaction.options.get('fiat').value

    await interaction.deferReply();
    try{
        const res = await axios.get(`${process.env.API_URL}/coins/${cryptoCurrency}/market_chart/range?vs_currency=${fiatCurrency}&from=${new Date().getTime()/1000-5*4*60}&to=${new Date().getTime()/1000}`);
        console.log(res.data);
        await interaction.editReply({
            content: `One ${cryptoCurrency} equals ${res.data.prices[res.data.prices.length-1][1].toFixed(2)} ${fiatCurrency}`
        })
    }catch(err){
        console.log(err);
        await interaction.editReply({
            content: `Oops! Some Error Occured :(`
        })
    }
}


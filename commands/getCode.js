import axios from 'axios';

export default async function (interaction) {
    console.log("Hi")
    const query = await interaction.options.get('query').value

    await interaction.deferReply()
    try{
        const res = await (await axios.get(`${process.env.API_URL}/search?query=${query}`)).data.coins;
        // console.log(res.data);
        await interaction.editReply({
            content: `There you go : `
        });
        for(let i=0;i<Math.min(res.length, 5);i++){
            console.log(res[i])
            await interaction.followUp({
                content: `${res[i].id}`
            })
        }
    }catch(err){
        console.log(err);
        await interaction.editReply({
            content: `Oops Some Error Occured`
        })
    }
}

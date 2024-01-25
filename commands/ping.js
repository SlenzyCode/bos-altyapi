const { AdvancedEmbed, AdvancedEmbedType } = require("utilscord");

module.exports = {
    name: "ping",
    description: 'Botta bir yavaşlık olduğunu gördüğünde bu komudu kullanarak botun gecikme hızına bakabilirsin.',
    type: 1,
    options: [],
    /** @param {import("discord.js").ChatInputCommandInteraction} interaction */
    run: async (client, interaction) => {
        const embed = new AdvancedEmbed()
            .setInteraction(interaction)
            .setDescription(`> **${client.user.username}** adlı botun gecikme hızı aşağıda verilmiştir.`)
            .addFields([
                { name: "🛜 Gecikme Hızı", value: `**${client.ws.ping}**`, inline: true }
            ])
            .setStyle(AdvancedEmbedType.Success)
        interaction.reply({ embeds: [embed] });
    }
};
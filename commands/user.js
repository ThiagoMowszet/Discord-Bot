const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Retorna la informacion del usuario!'),
	async execute(interaction) {
		await interaction.reply(`Tag: ${interaction.user.tag}\nID: ${interaction.user.id}`);
	},
};
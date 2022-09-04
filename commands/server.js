const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Retorna la informacion del servidor!'),
	async execute(interaction) {
		await interaction.reply(`Servidor: ${interaction.guild.name}\nMiembros Totales: ${interaction.guild.memberCount}`);
	},
};
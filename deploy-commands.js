const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Retorna pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Retorna la informacion del servidor!'),
	new SlashCommandBuilder().setName('user').setDescription('Retorna la informacion del usuario!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);


// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
.then(() => console.log('Successfully deleted all guild commands.'))
.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
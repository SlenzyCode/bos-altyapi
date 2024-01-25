const { Client, IntentsBitField, Partials } = require("discord.js");
const fs = require("fs");
const client = new Client({
    intents: Object.values(IntentsBitField.Flags),
    partials: Object.values(Partials)
});
Object.values(Partials);
const config = require("./config.json");
const chalk = require("chalk");
global.client = client;
client.commands = (global.commands = []);
require("./events/interactionCreate");
fs.readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });
    console.log(chalk.red`[COMMAND]` + ` ${props.name} komutu yüklendi.`)
});
fs.readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(chalk.blue`[EVENT]` + ` ${name} eventi yüklendi.`)
});
client.login(config.bot.token).catch(() => {
    console.log(chalk.bgRed`[START]` + ` Bot başlarken hata oluştu hataya sebep verebilecek faktörler.\n* config.json dosyasındaki bot parametresinin içindeki token kısmının girili olduğundan emin olun.\n* Bütün bilgileri kayıt ettiğinize emin olun.\n* Bot tokeninin aktif olduğundan emin olun.`);
});
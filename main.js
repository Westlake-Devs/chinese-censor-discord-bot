const Discord = require('discord.js')
const client = new Discord.Client()

var bannedWords = ['天安门', 'tiananmen', '六四', '6/4']
var curseWords = ['fuck', 'fuck you', 'cao', '草','曹']
var fakeThings = ['starvation', 'poverty', 'capitalism']
var offensive = ['pooh', "维尼"]

client.on('ready', () => {
        // List servers the bot is connected to
        console.log("Reporting Infiltrated Zones...")
        console.log("=======Infiltrated servers=======")
        client.guilds.forEach((guild) => {
            console.log("> " + guild.name)
            guild.channels.forEach((channel) => {
                console.log(` - ${channel.name} (${channel.type}) - ${channel.id}`)
            })
        })
        console.log("================================")
        console.log()
    }
)

function phraseMatchesList(phrase, list) {
    for(var i = 0; i < list.length; i++)
        if(phrase.includes(list[i]))
            return true
    return false
}

function processCommand(message) {
    let fullCommand = message.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)
    switch(primaryCommand) {
        case "disappear":
            async () => {
                message.delete()
                const fetched = await message.channel.fetchMessages({limit: arguments[0]}); // This grabs the last number(args) of messages in the channel.
                console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
    
                // Deleting the messages
                message.channel.bulkDelete(fetched)
                    .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
            }
            break

        case "nuke":
            console.log("nu")
            async () => {
                console.log("nuking")
                let fetched;
                do {
                    fetched = await channel.fetchMessages({limit: 100});
                    message.channel.bulkDelete(fetched);
                }
                while(fetched.size >= 2);
            }
            break
    }

}

client.on('message', (message) => {
    if(message.author.id == 584213592602181632) return
    // console.log(message)
    if(message.username)
    var m = message.content.toLowerCase()
    if(m == undefined)
        m = message.content
    console.log("> Intercepted message from " + message.author.username+":")
    console.log(m+"\n")

    // 和谐ing
    if(phraseMatchesList(m, bannedWords)) {
        message.delete()
        message.channel.send("警告：请"+message.author+"同志不要没有依据地制造污蔑我国政府的假新闻！")
    } else if(phraseMatchesList(m, curseWords)) {
        message.channel.send("不，你。")
        message.channel.send({files: ["./cnm.png"]})
    } else if (phraseMatchesList(m, fakeThings)) {
        message.channel.send("Doesn't exist and is a lie.")
    } else if (phraseMatchesList(m, offensive)) {
        message.channel.send("Hey you! "+message.author+" \nSTFU!")
    } else if (m.match("ping")) {
        message.channel.send("Ping你妈呀！")
    }
    // commands
    if (m.substring(0,1) == "!") {
        processCommand(message)
    }
});


const fs = require('fs')
fs.readFile('./token', 'utf8', (err, data) => {
        client.login(data)
    }
)
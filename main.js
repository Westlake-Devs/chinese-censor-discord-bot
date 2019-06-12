const Discord = require('discord.js')
const client = new Discord.Client()
//setup for mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netizendb', {useNewUrlParser: true});
const Netizen = require("./citizens.js");

var bannedWords = ['天安门', 'tiananmen', '六四', '6/4', "动态网自由门", "天安門", "天安门", "法輪功", "李洪志", "六四天安門事件", "天安門大屠殺", "反右派鬥爭", "大躍進政策]", "文化大革命", "人權", "民運", "自由", "獨立", "多黨制", "台灣", "臺灣", "中華民國", "西藏", "土伯特", "唐古特", "達賴喇嘛", "法輪功", "新疆維吾爾自治區", "諾貝爾和平獎", "劉暁波", "民主", "言論", "思想", "反共", "反革命", "抗議", "運動", "騷亂", "暴亂", "騷擾", "擾亂", "抗暴", "平反", "維權", "示威游行", "李洪志", "法輪大法", "大法弟子", "強制斷種", "強制堕胎", "民族淨化", "人體實驗", "肅清", "胡耀邦", "趙紫陽", "魏京生", "王丹", "還政於民", "和平演變", "激流中國", "北京之春", "大紀元時報", "九評論共産黨", "獨裁", "專制", "壓制", "統一", "監視", "鎮壓", "迫害", "侵略", "掠奪", "破壞", "拷問", "屠殺", "活摘器官", "誘拐", "買賣人口", "遊進", "走私", "毒品", "賣淫", "春畫", "賭博", "六合彩", "天安門", "天安门", "法輪功", "李洪志", "劉曉波动态网自由门"]
var curseWords = ['fuck', 'fuck you', 'cao', '草','曹']
var fakeThings = ['starvation', 'poverty', 'capitalism']
var offensive = ['pooh', "维尼"]

// Reporting accessible channels
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

// An Arrays.contains like function
function phraseMatchesList(phrase, list) {
    for(var i = 0; i < list.length; i++)
        if(phrase.includes(list[i]))
            return true
    return false
}

// Process bot commands
function processCommand(message) {
    let fullCommand = message.content.substr(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)
    switch(primaryCommand) {
        case "disappear":
            del = async () => {
                message.delete()
                const fetched = await message.channel.fetchMessages({limit: arguments[0]}); // This grabs the last number(args) of messages in the channel.
                console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
                // Deleting the messages
                message.channel.bulkDelete(fetched)
                    .catch(error => message.channel.send(`Error: ${error} Deletion attempts were obstructed by human rights lawyers. Skrew them.`)); // If it finds an error, it posts it into the channel.
            }
            del().then(() => {
                    message.channel.send("已和谐"+arguments[0]+"条跟帖。")
                }
            )
            break

        case "nuke":
        if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
        {
            nk = async () => {
                let fetched;
                do {
                    fetched = await message.channel.fetchMessages({limit: 100});
                    message.channel.bulkDelete(fetched);
                }
                while(fetched.size >= 2);
            }
            nk().then(
                () => {
                    message.channel.send("已和谐整个频道。")
                }
            )
          }
            break

        case "score":
          printScore(message)
          break
        case "silence":
          silence(message)
          break
        case "unsilence":
          unsilence(message)
          break

    }
}


//bans a user
function harvestOrgans(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
  {

  }
  else
  {
    return;
  }
}


//kicks a user
function forceLaborer(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
  {

  }
  else
  {
    return;
  }
}



//silences a user
function silence(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
  {
    Netizen.findOne({
      userID: message.mentions.users.first().id
    }, (err, creditScore) => {
      if(err) console.log(err);
        if(!creditScore){
          message.channel.send("Silenced " + message.mentions.users.first() + " by the order of the state.")
          const newScore = new Netizen({
            userID: message.author.id,
            creditScore: 1000,
            silenced: true
          })
          newScore.save().catch(err => console.log(err));
      }
      else
      {
        creditScore.silenced = true;
        message.channel.send("Silenced " + message.mentions.users.first() + " by the order of the state.")
        creditScore.save().catch(err => console.log(err));
      }
    })
  }
  else
  {
    return;
  }
}


//removes the silencer on a user
function unsilence(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
  {
    Netizen.findOne({
      userID: message.mentions.users.first().id
    }, (err, creditScore) => {
      if(err) console.log(err);
        if(!creditScore){
          message.channel.send("Unsilenced " + message.mentions.users.first() + " by the order of the state.")
          const newScore = new Netizen({
            userID: message.author.id,
            creditScore: 1000,
            silenced: false
          })
          newScore.save().catch(err => console.log(err));
      }
      else
      {
        creditScore.silenced = false;
        message.channel.send("Unsilenced " + message.mentions.users.first() + " by the order of the state.")
        creditScore.save().catch(err => console.log(err));
      }
    })
  }
  else
  {
    return;
  }
}



//modifies the social credit score
function modifyScore(message, amount)
{
  //checks to see if user is a party member
  //if(msg.member.roles.has(msg.guild.roles.find("name", "Party Official").id))
  //{
  //  return;
  //}
  //else{
  //finds the entry for the netizen
  Netizen.findOne({
    userID: message.author.id
  }, (err, creditScore) => {
    if(err) console.log(err);
    if(!creditScore){
      const newScore = new Netizen({
        userID: message.author.id,
        creditScore: 1000,
        silenced: false
      })
      newScore.save().catch(err => console.log(err));
    }
    else
    {
      creditScore.creditScore = creditScore.creditScore + amount;
      creditScore.save().catch(err => console.log(err));
    }
  })
  }
//}


//gets the social credit score
function printScore(message)
{
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(args.length != 1)
  {
    return;
  }


  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id))
  {
    Netizen.findOne({
      userID: message.mentions.users.first().id
    }, (err, creditScore) => {
      if(err) console.log(err);
        if(!creditScore){
          message.channel.send("1000")
          const newScore = new Netizen({
            userID: message.author.id,
            creditScore: 1000,
            silenced: false
          })
          newScore.save().catch(err => console.log(err));
      }
      else
      {
        message.channel.send(creditScore.creditScore)
      }
    })
  }
  else
  {
    Netizen.findOne({
      userID: message.mentions.users.first().id
    }, (err, creditScore) => {
      if(err) console.log(err);
        if(!creditScore){
          message.channel.send("1000")
          const newScore = new Netizen({
            userID: message.author.id,
            creditScore: 1000,
            silenced: false
          })
          newScore.save().catch(err => console.log(err));
      }
      else
      {
        message.channel.send(creditScore.creditScore)
      }
    })
  }

}




// Message interceptor
client.on('message', (message) => {
    if(message.channel.name == "中华民国自由区" || message.author.bot) return
    // console.log(message)
    let m = message.content
    m = m.toLowerCase() === undefined ? m : m.toLowerCase()
    console.log("> Intercepted message from " + message.author.username+":")
    console.log(m+"\n")

    //checks to see if user has been silenced by the order of the state
    Netizen.findOne({
      userID: message.author.id
    }, (err, creditScore) => {
      if(err) console.log(err);
        if(!creditScore){
          const newScore = new Netizen({
            userID: message.author.id,
            creditScore: 1000,
            silenced: false
          })
          newScore.save().catch(err => console.log(err));
      }
      else
      {
        if(creditScore.silenced)
        {
          message.delete()
        }
      }
    })

    // 和谐ing
    if(phraseMatchesList(m, bannedWords)) {
        message.delete().catch(err => console.log(err))
        message.author.send("警告：请"+message.author+"同志不要没有依据地制造污蔑我国政府的假新闻！")
        modifyScore(message, -50)
    } else if(phraseMatchesList(m, curseWords)) {
        message.author.send("不，你。")
        message.author.send({files: ["./cnm.png"]})
        modifyScore(message, -10)
    } else if (phraseMatchesList(m, fakeThings)) {
        message.author.send("Doesn't exist and is a lie.")
        modifyScore(message, -20)
    } else if (phraseMatchesList(m, offensive)) {
        message.author.send("Hey you! "+message.author+" \nSTFU!")
        modifyScore(message, -10)
    } else if (m.match("ping")) {
        message.author.send("Ping你妈呀！")
    }
    // commands
    if (m.substring(0,1) == "!") {
        processCommand(message)
    }
});



// Loggin in
const fs = require('fs')
fs.readFile('./token', 'utf8', (err, data) => {
        client.login(data)
    }
)

//setup for mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/netizendb', {useNewUrlParser: true});
const Netizen = require("./citizens.js");

// checking to see that this bruh is imported
exports.imported = function() {
  console.log("CommandProcessor imported")
}

// deleting messages
exports.disappear = function(message) {
  let fullCommand = message.content.substr(1)
  let arguments = fullCommand.split(" ").slice(1)
  if(arguments[0] > 100)
  {
    message.channel.send('这个数字太大了。')
    return;
  }
  else if(arguments[0] < 1)
  {
    message.channel.send('不可能。')
    return;
  }
  del = async () => {
      message.delete()
      const fetched = await message.channel.fetchMessages({limit: arguments[0]}); // This grabs the last number(args) of messages in the channel.
      console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
      // Deleting the messages
      message.channel.bulkDelete(fetched).catch(error => console.log(error)); // If it finds an error
  }

  del().then(() => {
          message.channel.send("已和谐"+arguments[0]+"条跟帖。")
      }
  )
}

// clearing channel
exports.nuke = function(message) {
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id)) {
    nk = async () => {
        let fetched;
        do {
            fetched = await message.channel.fetchMessages({limit: 100});
            message.channel.bulkDelete(fetched).catch(error => console.log(error));
        }
        while(fetched.size >= 2);
    }
    nk().then(
        () => {
            message.channel.send("已和谐整个频道。")
        }
    )
  }
}

//bans a user
exports.harvestOrgans = function(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id)) {

  }
  else {
    return;
  }
}

//kicks a user
exports.forceLaborer = function(message)
{
  if(message.member.roles.has(message.guild.roles.find("name", "Party Official").id)) {

  }
  else {
    return;
  }
}

//silences a user
exports.silence = function(message)
{
  try {
    let test = message.mentions.users.first().id
  }
  catch(err) {
    message.channel.send("Error, wrong input.")
    return
  }
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

//unsilences a user
exports.unsilence = function(message) {
  try {
    let test = message.mentions.users.first().id
  }
  catch(err) {
    message.channel.send("Error, wrong input.")
    return
  }
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
exports.modifyScore = function(message, amount)
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
        creditScore: 1000
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

//gets the social credit score
exports.printScore = function(message)
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
            creditScore: 1000
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
            creditScore: 1000
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

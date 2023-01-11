const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('./config')

const ImageUrl = 'https://www.pngall.com/wp-content/uploads/2016/03/Cat-PNG-2.png';

const bot = new TelegramBot(TOKEN, {polling: true});

var notes = [];

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню!');
    bot.sendPhoto(userId, ImageUrl)
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
        const curDate = new Date().getHours() + ':' + new Date().getMinutes();
        if (notes[i]['time'] === curDate) {
            bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
            notes.splice(i, 1);
        }
    }
}, 1000);
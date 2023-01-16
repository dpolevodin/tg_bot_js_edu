const TelegramBot = require('node-telegram-bot-api');
const { TOKEN } = require('./config')

const ImageUrl = 'https://avatars.mds.yandex.net/i?id=cfcc5522261057c3064dc06ebb7a3e34-6946611-images-thumbs&n=13';

const bot = new TelegramBot(TOKEN, {polling: true});

const keyboard = [
    [
        {
            text: 'Тюменская слобода', // текст на кнопке
            callback_data: 'sloboda' // данные для обработчика событий
        }
    ],
    [
        {
            text: 'ДОК',
            callback_data: 'dok'
        }
    ],
    [
        {
            text: 'Ново-Патрушева',
            callback_data: 'patrushevo' //внешняя ссылка
        }
    ]
];


const keyboard2 = [
    [
        {
            text: '1 комнатная', // текст на кнопке
            callback_data: 'sloboda' // данные для обработчика событий
        }
    ],
    [
        {
            text: '2 комнатная',
            callback_data: 'dok'
        }
    ],
    [
        {
            text: '3 комнатная',
            callback_data: 'patrushevo' //внешняя ссылка
        }
    ]
];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
    const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

    // отправляем сообщение
    bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    let img = '';

    if (query.data === 'sloboda') { // если кот
        img = ImageUrl
    }

    if (query.data === 'dok') { // если пёс
        img = ImageUrl
    }

    if (query.data === 'patrushevo') { // если пёс
        img = ImageUrl
    }

    if (img) {
        bot.sendPhoto(chatId, img, { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard2
            }
        });
    } else {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }
});

// bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
//     var userId = msg.from.id;
//     var text = match[1];
//     var time = match[2];
//
//     notes.push({ 'uid': userId, 'time': time, 'text': text });
//
//     bot.sendMessage(userId, 'Отлично! Я обязательно напомню!');
//     bot.sendPhoto(userId, ImageUrl)
// });
//
// setInterval(function(){
//     for (var i = 0; i < notes.length; i++) {
//         const curDate = new Date().getHours() + ':' + new Date().getMinutes();
//         if (notes[i]['time'] === curDate) {
//             bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
//             notes.splice(i, 1);
//         }
//     }
// }, 1000);
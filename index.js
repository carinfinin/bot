const ApiTelegram = require('node-telegram-bot-api')

const token = '5142066043:AAFCLPlBswkkAjsSpJ8voHowKRsekqZuGKE'

const bot = new ApiTelegram(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'},],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'},],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'},],
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Информация'},
        {command: '/game', description: 'Игра'},
    ])

    bot.on('message', async msg => {
        const text = msg.text
        const user = msg.from.username
        const chatId = msg.chat.id
        if(text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/370/3de/3703deec-fc11-465f-b344-f790c6a5cdac/9.webp')
            return bot.sendMessage(chatId, `Привет ${user} и добро пожаловать в чат`)
        }
        if(text === '/info') {
            return bot.sendMessage(chatId, `Какая то информация`)
        }
        if(text === '/game') {
            await bot.sendMessage(chatId, `Сейчас с играем в игру`)
            const randNumber = Math.floor(Math.random() * 10)
            await bot.sendMessage(chatId, `${randNumber}`)
            chats[chatId] = randNumber
            return bot.sendMessage(chatId, `Отгадывай`, gameOptions)
        }
        return bot.sendMessage(chatId, `Чувак я не знаю такой команды`)
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data == chats[chatId]) {
            await bot.sendMessage(chatId, `Угадал ${data}`)
        }
        else {
            await bot.sendMessage(chatId, ` не Угадал ${data}`)

        }
    })
}

start()

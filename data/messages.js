const {format} = require("date-fns");

const messages = {
    data: [
        // {
        //     user: 'Sam',
        //     msg: 'Hello, world!',
        //     timestamp: '24/02/2023 @ 16:50:05'
        // },
    ],
    addMessage(user, msg) {
        const timestamp = `${format(new Date(), 'dd/MM/yyyy @ HH:mm:ss')}`;

        console.log(JSON.stringify({user, msg, timestamp}));

        this.data.push({user, msg, timestamp});
    },
    addServiceMessage(msg) {
        this.addMessage('chat', msg);
    },
    setMessages(data) {
        this.data = data;
    }
}

module.exports = messages;
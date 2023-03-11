const users = require('../data/users');
const messages = require('../data/messages');

const getData = (req, res) => {
    const userId = req.query.id;

    if (!users.hasUser(userId)) {
        return res.sendStatus(403);
    }

    users.updateLastOnline(userId);
    const currentUser = users.getUser(userId);

    const mappedMessages = messages.data.map(m => {
        if (m.user === currentUser.userName) {
            return {...m, user: 'Me'};
        }
        return m;
    });

    const userNames = users.getUserNames();

    const data = {messages: mappedMessages, users: userNames};
    return res.json(JSON.stringify(data));
}

const createMessage = (req, res) => {
    const id = req.body.id;

    if (!users.hasUser(id)) {
        return res.sendStatus(403);
    }

    const user = users.getUser(id).userName;
    const msg = req.body.msg;

    if (msg.trim().length > 0) {
        messages.addMessage(user, msg);
    }

    return res.sendStatus(201);
}

module.exports = {getData, createMessage};
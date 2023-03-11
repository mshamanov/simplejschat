const users = require('../data/users');
const messages = require("../data/messages");

const trimOfflineUsers = (offlineLimit = 1000 * 60, interval = 1000 * 60 * 3) => {
    let callback = () => {
        const now = new Date();

        const map = users.getUsersBy(u => {
            const diff = now - u.lastOnline;
            return diff >= offlineLimit;
        });

        for (const [id, userInfo] of map) {
            if (users.removeUser(id)) {
                messages.addServiceMessage(`${userInfo.userName} has left (timeout)`);
            }
        }

        setTimeout(callback, interval);
    };

    setTimeout(callback, interval);
}

module.exports = {trimOfflineUsers};
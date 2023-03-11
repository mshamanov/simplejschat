const users = require('../data/users');
const messages = require('../data/messages');

const logout = (req, res) => {
    const userId = req.query.id;

    if (!users.hasUser(userId)) {
        return res.redirect('/');
    }

    const currentUser = users.getUser(userId);
    const removed = users.removeUser(userId);

    if (removed) {
        messages.addServiceMessage(`${currentUser.userName} has left`);
    } else {
        console.log(`Error occurred while deleting user ${currentUser.userName} (${userId})`);
    }

    return res.redirect('/');
}

module.exports = {logout}
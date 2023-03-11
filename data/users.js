const serviceUser = 'chat';
const users = new Map();

const getUser = (id) => {
    return users.get(id);
}

const getUsersBy = (byPredicate) => {
    const result = new Map();

    for (const [id, userInfo] of users.entries()) {
        if (byPredicate(userInfo)) {
            result.set(id, userInfo);
        }
    }

    return result;
}

const getUserNames = () => {
    return [...users.values()].map(u => u.userName);
}

const addUser = (id, user) => {
    users.set(id, {userName: user, lastOnline: new Date()});
}

const removeUser = (id) => {
    return users.delete(id);
}

const hasUser = (id) => {
    return users.has(id);
}

const isForbidden = (user) => {
    if (user.trim().length === 0 || user.length > 50 || user.toLowerCase() === serviceUser.toLowerCase()) {
        return true;
    }

    return [...users.values()].some(u => u.userName.toLowerCase() === user.toLowerCase());
}

const updateLastOnline = (id) => {
    const user = users.get(id);

    if (user) {
        users.get(id).lastOnline = new Date();
    }
}

module.exports = {getUserNames, getUser, getUsersBy, addUser, removeUser, hasUser, isForbidden, updateLastOnline};
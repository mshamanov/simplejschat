const REFRESH_INTERVAL = 7 * 1000;
const logoutApi = '/logout';
const msgApi = '/api/data';

let userId = null;
let lastRefreshTime = null;

const timeOutRefreshCallBack = () => {
    const now = Date.now();
    const diff = now - lastRefreshTime;
    let timeout;

    if (diff >= REFRESH_INTERVAL) {
        getMessagesFromServer();
        timeout = REFRESH_INTERVAL;
    } else {
        timeout = REFRESH_INTERVAL / 2;
    }

    setTimeout(timeOutRefreshCallBack, timeout);
}

const logout = () => {
    fetch(`${logoutApi}?id=${userId}`, {
        method: "GET",
        keepalive: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    sendMessageForm.addEventListener('submit', sendMessageToServer);
    window.addEventListener('beforeunload', logout);
    logoutBtn.addEventListener('click', () => {
        document.location.assign(`${logoutApi}?id=${userId}`);
    });

    sendMessageForm['msg'].focus();
    userId = new URLSearchParams(document.location.search).get('id');
    getMessagesFromServer();
    setTimeout(timeOutRefreshCallBack, REFRESH_INTERVAL);
});

const processData = (data) => {
    clearData();
    updateData(data);
    updateScrollToBottom();
}

const updateData = (data) => {
    const {messages, users} = data;
    messages.map(item => createMessageBox(item.user, item.msg, item.timestamp))
        .forEach(box => chatMessagesSection.appendChild(box));
    users.map(u => createUserItem(u)).forEach(li => chatUsersSection.appendChild(li));
}

const getMessagesFromServer = async () => {
    const result = await fetch(`${msgApi}?id=${userId}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
        },
    });

    if (result.ok) {
        const json = await result.json();
        const data = JSON.parse(json);
        processData(data);
        lastRefreshTime = Date.now();
    } else {
        document.location.assign("/");
    }
}

const sendMessageToServer = async (event) => {
    event.preventDefault();

    const json = {
        id: userId,
        msg: event.target['msg'].value
    };

    const result = await fetch(msgApi, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(json)
    });

    if (result.ok) {
        getMessagesFromServer();
        sendMessageForm.reset();
    } else {
        document.location = '/';
    }
}


const chatMessagesSection = document.querySelector(".chat-wrapper__main__messages");
const chatUsersSection = document.querySelector(".chat-wrapper__main__users ul");
const sendMessageForm = document.querySelector(".chat-wrapper__actions__form");
const logoutBtn = document.querySelector("#logoutBtn");

const createUserItem = (user) => {
    const li = document.createElement('li');
    li.textContent = user;
    return li;
}
const createMessageBox = (user, msg, timestamp) => {
    const lowerCasedUser = user.toLowerCase();

    if (lowerCasedUser === 'chat') {
        return createServiceBox(msg, timestamp);
    } else if (lowerCasedUser === 'me') {
        return createLeftChatBox('Me', msg, timestamp);
    } else {
        return createRightChatBox(user, msg, timestamp);
    }
}

const createServiceBox = (msg, timestamp) => {
    const chatBox = createChatBox(msg, timestamp);
    chatBox.classList.add('chat-box--service');

    return chatBox;
}

const createLeftChatBox = (user, msg, timestamp) => {
    const chatBox = createChatBox(msg, timestamp);
    chatBox.classList.add('chat-box--self');

    const chatBoxOutletSpan = document.createElement('span');
    chatBoxOutletSpan.classList.add('left-outlet');

    const userParagraph = document.createElement('p');
    userParagraph.classList.add('username');
    const userNameAsText = document.createTextNode(` ${user}`);
    userParagraph.appendChild(userNameAsText);


    chatBox.prepend(chatBoxOutletSpan, userParagraph);

    return chatBox;
}

const createRightChatBox = (user, msg, timestamp) => {
    const chatBox = createChatBox(msg, timestamp);
    chatBox.classList.add('chat-box--all');

    const chatBoxOutletSpan = document.createElement('span');
    chatBoxOutletSpan.classList.add('right-outlet');

    const userParagraph = document.createElement('p');
    userParagraph.classList.add('username');

    const userNameAsLink = document.createElement('a');
    userNameAsLink.setAttribute('href', '#');
    userNameAsLink.innerHTML = user;
    userNameAsLink.addEventListener('click', clickFn);
    userParagraph.appendChild(userNameAsLink);

    function clickFn(e) {
        const currentMsg = sendMessageForm['msg'].value;
        sendMessageForm['msg'].value = `${e.target.textContent}, ${currentMsg}`;
        sendMessageForm['msg'].focus();
    }

    chatBox.prepend(chatBoxOutletSpan, userParagraph);

    return chatBox;
}

const createChatBox = (msg, timestamp) => {
    const chatBoxDiv = document.createElement('div');
    chatBoxDiv.classList.add('chat-box');

    const messageParagraph = document.createElement('p');
    messageParagraph.classList.add('message');
    messageParagraph.textContent = msg;

    const timestampParagraph = document.createElement('p');
    timestampParagraph.classList.add('timestamp');
    timestampParagraph.textContent = timestamp;

    chatBoxDiv.append(messageParagraph, timestampParagraph);

    return chatBoxDiv;
}

const clearData = () => {
    chatMessagesSection.innerHTML = '';
    chatUsersSection.innerHTML = '';
}

const updateScrollToBottom = () => {
    chatMessagesSection.scrollTop = chatMessagesSection.scrollHeight;
}
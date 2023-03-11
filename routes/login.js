const express = require('express');
const path = require("path");
const router = express.Router();
const uuid = require('uuid');
const users = require('../data/users');
const messages = require("../data/messages");

router.get("/", (req, res) => {
    let id = req.query.id;

    if (!users.hasUser(id)) {
        return res.redirect("/");
    }

    return res.sendFile(path.join(__dirname, "..", "views", "chat.html"));
});

router.post("/", (req, res) => {
    const id = uuid.v4();
    const user = req.body.user;

    if (users.isForbidden(user)) {
        console.log(`User ${user} already exists`);
        return res.redirect('/');
    }

    users.addUser(id, user);
    messages.addMessage('chat', `${user} has logged in`);

    return res.redirect(`/login?id=${id}`);
});

module.exports = router;

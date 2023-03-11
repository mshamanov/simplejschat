const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;
const publicDir = path.join(__dirname, "public");
const {trimOfflineUsers} = require("./util/workers");

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/", express.static(publicDir));

app.use("/login", require('./routes/login'));
app.use("/logout", require('./routes/logout'));
app.use("/api/data", require('./routes/api/data'));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "views", "index.html"));
});

trimOfflineUsers();

app.listen(port, () => console.log(`server is running on port ${port}`));
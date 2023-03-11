const express = require('express');
const router = express.Router();
const dataController = require('../../controllers/dataController');

router.route("/")
    .get(dataController.getData)
    .post(dataController.createMessage);

module.exports = router;

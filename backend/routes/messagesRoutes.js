const express = require('express');
const router = express.Router();

const {addMessage, getAllMessages} = require('../controllers/messages');

router.post("/addMessage", addMessage).post("/getMessage", getAllMessages)

module.exports = router;
const express = require('express');
const router = express.Router();

const {register, login, setProfile} = require('../controllers/auth');

router.post("/register", register).post("/login", login)
router.post("/setProfile/:id", setProfile)

module.exports = router;
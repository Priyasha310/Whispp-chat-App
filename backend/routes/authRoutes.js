const express = require('express');
const router = express.Router();

const {register, login, setProfile, getAllUsers} = require('../controllers/auth');

router.post("/register", register).post("/login", login)
router.post("/setProfile/:id", setProfile)
router.get("/allUsers/:id", getAllUsers) 

module.exports = router;
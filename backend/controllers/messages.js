const Messages = require("../models/messageModel");

const addMessage = async(req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await Messages.create({
            message:{text: message},
            users: [from, to],
            sender: from,
        });
        if(data) return res.json({msg: "message added successfully"})
        return res.json({msg: "Failed to add message to database"});
    } catch (error) {
        console.log(error);
        next(error);
    }                                
}

const getAllMessages = async(req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {addMessage, getAllMessages};
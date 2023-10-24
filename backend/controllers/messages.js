const messageModel = require("../models/messageModel");
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
        const {from, to} = req.body;
        const messages = await messageModel.find({
            users: {$all: [from, to]},
        }).sort({updatedAt:1});
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString()===from,
                message: msg.message.text,
            }
        });
        res.json(projectMessages);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {addMessage, getAllMessages};
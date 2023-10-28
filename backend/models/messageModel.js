const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
    {
        message:{
            text: {
                type: String,
                required: true,
            },
            timeSent: {
                type: Date,
                default: Date.now,
            }
        },
        users: Array,
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamp: true,
    },
);

module.exports = mongoose.model("Messages", messageSchema);
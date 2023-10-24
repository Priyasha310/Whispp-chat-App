require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require('./routes/messagesRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

const port = process.env.PORT || 5000;
const connectDB = require('./db/connect');

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, 
            console.log(`Server listening on port ${port}`
        ))
    } catch (error) {
        console.log(error);
    }
}

start()
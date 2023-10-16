const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
// }

const connectDB = (url) => mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = connectDB

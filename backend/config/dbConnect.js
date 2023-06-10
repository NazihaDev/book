const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://naziha1aloui:ihu1h7kfAATyhh6N@cluster0.fbc61en.mongodb.net/mern-book",
      {
        //useFindAndModify:true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("Db Connected"))
    .catch((err) => console.log(err));
};
module.exports = dbConnect;

const mongoose  = require('mongoose');
const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://shivamsiliconion:Shivam99313@books-management.ozw1yhp.mongodb.net/?retryWrites=true&w=majority&appName=books-management", {
            useNewUrlParser: true,
        })
        console.log("Mongo Db connected")
    } catch (err) {
        console.log(err.message)
        throw err;
    }
}

module.exports = connectDb
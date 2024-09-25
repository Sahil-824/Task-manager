const mongoose = require('mongoose');


const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://sahilpanchal824824:sWFvOMWTVddofWdM@task-manager.k03ox.mongodb.net/?retryWrites=true&w=majority&appName=task-manager");
        console.log("MongoDb Connected Successfully");

    } catch(error){
        console.log("Error in connected Mongodb ",error);
        process.exit(0);

    }
}

module.exports = connectDB;


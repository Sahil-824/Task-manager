const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",

    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Completed","InComplete"],
        default:"InComplete"
    }

},{
    timestamps:true
})

module.exports = mongoose.model("todo",todoSchema);
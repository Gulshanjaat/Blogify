const mongoose = require("mongoose")

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    discription:{
        type:String,
        require:true
    },
    cat_id:{
        type: mongoose.Types.ObjectId,
        ref:"categorymodel",
        require:true
    },
    profile:{
        type:String
    }
})
const blogmodel=mongoose.model("blogmodel",blogschema)
module.exports=blogmodel
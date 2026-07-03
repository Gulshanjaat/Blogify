const mongoose=require("mongoose")

const adminschema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
})

const adminmodel=mongoose.model("adminmodel",adminschema)
module.exports=adminmodel
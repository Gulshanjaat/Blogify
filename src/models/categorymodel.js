const mongoose = require("mongoose")


const catogeryschema = new mongoose.Schema({
    cat_name:{
        type:String,
        require:true
    }
})

const cat_model=mongoose.model("categorymodel",catogeryschema)
module.exports=cat_model
const mongoose = require("mongoose");
const schema = mongoose.schema;

const collegeSchema = new mongoose.Schema({
    adminId:{

        type:String,
        required:true

    },
    name:{
        type:String,
        required:true,
        
    },
    tagline:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        street:String,
        // city:String,
        // pincode:String

    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    modifiedAt:{
        type:Date,
        default: Date.now,
    },
    isDeleted:{
        type:Boolean,
        required:false,
        default:false
    },
    deletedAt:{
        type:Date,
        required:false,
        default:null
    },
    
})
{ timestamps: true };


module.exports = mongoose.model("College", collegeSchema);
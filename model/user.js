const mongoose = require("mongoose");
const schema = mongoose.schema;

const userSchema = new mongoose.Schema({
    title:{
        type:String,
        enum:['Mr', 'Mrs', 'Miss'],
        required:true
    },
    name:
    {
        type:String,
         required:true
    },
    email:{
        type:String,
        required:true, 
        unique:true, 
        validate: {
            validator: (value) => 
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value),
            message: `Please enter a valid email address`
        }
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    modifiedAt:{
        type:Date,
        default: Date.now
    },
    // userId:{
    //     type : mongoose.SchemaTypes.ObjectId,
    // }

})
{ timestamps: true };

module.exports = mongoose.model("Input", userSchema);
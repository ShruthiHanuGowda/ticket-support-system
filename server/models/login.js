const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },
    email: {
        type: String,
        required: true
       
    },
    password: {
        type: String,
        required: true
    },
    position:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true
    }

})

// const user = mongoose.model('user', userSchema);
module.exports.User = mongoose.model("user_data", userSchema,"user_data");

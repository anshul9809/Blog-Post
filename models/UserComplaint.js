const mongoose = require("mongoose");

const UserComplaintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    number: {
        type: Number,
        required:true,
    },
    subject:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        require: true,
    }
},{
    timestamps: true
});

module.exports = mongoose.model("UserComplaint", UserComplaintSchema);

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        uniqe: true,
        required: true
    },
    password:{
        type: String,
        required:true
    }
},
{
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    const user = this;
    // Only hash the password if it's modified
    if (!user.isModified('password')){
        return next();
    }
    try {
        // Generating a salt
        const salt = await bcrypt.genSalt(10);

        // Hashing the password with the generated salt
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Overriding the plaintext password with the hashed one
        user.password = hashedPassword;

        next();
    }catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports=User;
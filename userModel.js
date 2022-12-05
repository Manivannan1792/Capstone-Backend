import {mongoose} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=mongoose.Schema({
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    token:{
        type: 'string',
    },
    favorites: {
        type: 'array'
    }
})

userSchema.pre('save', async function(next) {
    const user =this;
    if(user.isModified('password')) {
      user.password = await bcrypt.hashSync(user.password,10);
    }
    
    next();

})


userSchema.statics.findByCredentials= async function(email,password) {
    const user = await User.findOne({email});
    if(!user){

         throw new Error('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if(!passwordMatch){
        throw new Error('Invalid credentials');
    }
    return user;
}


userSchema.methods.generateToken=async function(){
    const user =this;
    const token = await jwt.sign({_id: user._id},process.env.SECRET_KEY);
    user.token = token;
    await user.save();
    return token;
}
userSchema.methods.toJSON= function(){
    const user =this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject._id;
    return userObject;
}
export const User = mongoose.model('User',userSchema);
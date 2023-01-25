const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    img: {type: String}
}, { timestamps: true });

//midlleware before saving
UserSchema.pre('save', async function(){
    //generating random bytes 
    const salt = await bcrypt.genSalt(10)
    //referencing the password from the above schema and hashing it using bcrypt library
    this.password = await bcrypt.hash(this.password,salt)
})

//midlleware before updating
// UserSchema.pre('update', async function(next){
//     const password = this.getUpdate().$set.password;
//     console.log(password)
//         if (!password) {
//             return next();
//         }
//         try {
//             const salt = await bcrypt.genSalt(10);
//             const hash = await bcrypt.hash(password,salt);
//             this.getUpdate().$set.password = hash;
//             next();
//         } catch (error) {
//             return next(error);
//         }
// })

//instance method, here this keyword signifies the instance of the calling object
UserSchema.methods.comparePassword = async function (secondpartypassword){
    const isMatch = await bcrypt.compare(secondpartypassword, this.password)
    return isMatch
}
module.exports = mongoose.model("User", UserSchema);


/*
    Schema to create, delete, modify users
*/

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const sha256 = require('sha256');

var userSchema = new mongoose.Schema({
    name: 'string',
    email: 'string',
    password: 'string',
    phone: 'string'
});

var UserModel = mongoose.model('user', userSchema);


function deleteUser(emailAddress) {
    UserModel.findOneAndDelete({ email: emailAddress }, (err, usr) => {
        if (err || !usr) {
            console.log('Error Deleting User');
        } else {
            console.log('User Deleted Successfully');
        }
    });
}


function modifyUser(userId, name, email, password, phone) {
    UserModel.findOneAndUpdate({userId: ObjectId(userId)}, {
        name: name,
        email: email,
        password: sha256(password),
        phone: phone
    });
}

module.exports = {
    modifyUser: modifyUser,
    deleteUser: deleteUser,
    UserModel: UserModel
};
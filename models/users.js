/*
    Schema to create, delete, modify users
*/

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const sha256 = require('sha256');

var userSchema = new mongoose.Schema({
    name: 'string',
    address: 'string',
    email: 'string',
    password: 'string',
    phone: 'string',
    bloodGroup: 'string'
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


function modifyUser(userId, name, address, email, password, phone, bloodGroup) {
    UserModel.findOneAndUpdate({userId: ObjectId(userId)}, {
        name: name,
        email: email,
        address: address,
        password: sha256(password),
        phone: phone,
        bloodGroup: bloodGroup
    });
}

module.exports = {
    modifyUser: modifyUser,
    deleteUser: deleteUser,
    UserModel: UserModel
};
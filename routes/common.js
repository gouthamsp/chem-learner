var express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const environmentVariables = require('../env-variables');
const userObject = require('../models/users');


/* Generates a response using a predefined template */
const code_gen = {
    0: 'Success',
    1: 'Error',
    2: 'Invalid Password',
    3: 'Invalid email or User does not exisit',
    4: 'Logout successfull'
};
function generateResponse(code, result, message) {
    if (!message) {
        message = code_gen[code];
    }
    return {
        code: code,
        result: result,
        message: message
    }
}


/* Decodes a token for all the info within the token */
function decodeUserToken(token) {
    const decodedToken = jsonwebtoken.decode(token);
    if (!decodedToken) {
        console.log('Invalid token');
        return null;
    } else {
        console.log('Decoded payload: ', decodedToken);
        return decodedToken;
    }
}


/* Verify token*/
function verifyUserToken(token) {
    return true;
}

/* Generate token*/
function generateUserToken(userId, res) {
    userObject.UserModel.findById(userId, (err, user) => {
        if (err || !user) {
            console.log('Error finding user or user doesn\'t exist --> ', err);
        } else {
            console.log(user.email);
            const payload = {
                _id: user._id,
                expires: '1d'
            }
            const generatedToken = jsonwebtoken.sign(payload, environmentVariables.apiIdentifier);
            console.log('Generated Token is : ', generatedToken);
            // TODO: Record User Signin here
            res.send(generateResponse(0, { token: generatedToken }));
        }
    });
}


module.exports = {
    decodeUserToken: decodeUserToken,
    verifyUserToken: verifyUserToken,
    generateUserToken: generateUserToken,
    generateResponse: generateResponse
};
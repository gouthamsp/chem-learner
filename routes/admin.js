const express = require('express');
const router = express.Router();
const adminModel = require('../models/admins');
const common = require('./common');
const chemicalModel = require('../models/chemicals');



// Login to admin panel -- endpoint --> /admin/login/ POST
router.post('/login/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    adminModel.AdminModel.findOne({ email: email }, (err, usr) => {
        if (usr || !err) {
            const encodedAdminPassword = usr.password;
            if (sha256(password) === encodedAdminPassword) {
                common.generateUserToken(usr._id, res);
            } else {
                res.send(common.generateResponse(2));
            }
        } else {
            res.send(common.generateResponse(3));
        }
    });
});



// Create User for admin Panel -- endpoint --> /admin/signup/ POST
router.post('/signup/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    adminModel.AdminModel.findOne({ email: email }, (err, usr) => {
        if (!err || usr) {
            res.send(common.generateResponse(6));
        } else {
            const newAdmin = new adminModel.AdminModel({
                name: name,
                email: email,
                password: sha256(password)
            });
            newAdmin.save();
            res.send(common.generateResponse(0));
        }
    });
});


// Add Chemicals and elements to the database -- endpoint --> /admin/addChemicals/ POST
router.post('/addChemicals/', (req, res) => {
    const authToken = req.headers['authorization'];
    const decodedAuthToken = common.decodeUserToken(authToken);

    if (!decodedAuthToken) {
        res.send(common.generateResponse(8));
    } else {
        const name = req.body.name;
        const chemicalName = req.body.chemicalName;
        const compoundStructure = req.body.compoundStructure;
        const compoundStructureImage = req.body.compoundStructureImage;
        const funFacts = req.body.funFacts;
        const discoveredBy = req.body.discoveredBy;
        const discoveredOn = req.body.discoveredOn;
        const discoveryHistory = req.body.discoveryHistory;
        const compound3DRender = req.body.compound3DRender;

        chemicalModel.chemicalModel.findOne({ name: name, chemicalName: chemicalName }, (err, chem) => {
            if (!err || chem) {
                res.send(common.generateResponse(11));
            } else {
                var newChemical = new chemicalModel.chemicalModel({
                    name: name,
                    chemicalModel: chemicalModel,
                    compoundStructure: compoundStructure,
                    compoundStructureImage: compoundStructureImage,
                    funFacts: funFacts,
                    discoveredBy: discoveredBy,
                    discoveredOn: discoveredOn,
                    discoveryHistory: discoveryHistory,
                    compound3DRender: compound3DRender,
                    addedBy: decodedAuthToken._id
                });

                newChemical.save();
                res.send(common.generateResponse(0));
            }
        });
    }
});



// Add chemical reactions to the database -- endpoint --> /admin/addReaction/ POST
router.post('/addReaction/', (req, res) => {
    const authToken = req.headers['authorization'];
    const decodedAuthToken = common.decodeUserToken(authToken);

    if (!decodedAuthToken) {
        res.send(common.generateResponse(8));
    } else {
        //TODO: Add a reaction after checking if the reaction doesn't exist
    }
});


module.exports = router;
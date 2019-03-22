/*
    Schema to create, delete, modify chemical reactions
*/


const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionName: {
        type: String,
        required: true
    },
    primaryChemicals: {
        type: [],
        required: true
    },
    secondaryChemicals: {
        type: [],
        required: false
    },
    tertiaryChemicals: {
        type: [],
        required: false
    },
    heatSupplied: {
        type: [],
        required: false
    },
    pressureSupplied: {
        type: [],
        required: false
    },
    airSupplied: {
        type: [],
        required: false
    },
    orderOfChemicals: {
        type: [],
        required: true
    },
    products: {
        type: [],
        required: true
    },
    catalysts: {
        type: [],
        required: false
    },
    reagents: {
        type: [],
        required: false
    },
    substrate: {
        type: [],
        required: false
    },
    typeOfReactions: {
        type: String,
        required: true
    }
});


var ReactionModel = mongoose.model('reaction', reactionSchema);

module.exports = {
    ReactionModel: ReactionModel
};
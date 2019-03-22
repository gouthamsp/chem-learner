/*
    Schema to create, delete, modify chemical compounds
*/

const mongoose = require('mongoose');


var chemicalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chemicalName: {
        type: String,
        required: false
    },
    compoundStructure: {
        type: String,
        required: true
    },
    compoundStructureImage: {
        type: String,
        required: true
    },
    funFacts: {
        type: [],
        required: false
    },
    discoveredBy: {
        type: String,
        required: true
    },
    discoveredOn: {
        type: String,
        required: true
    },
    discoveryHistory: {
        type: String,
        required: false
    },
    compound3DRender: {
        type: String,
        required: false
    },
    addedBy: {
        type: String,
        required: true
    },
    periodicTableGroup: {
        type: Number,
        required: false
    },
    atomicNumber: {
        type: Number,
        required: false
    },
    periodicTablePeriod: {
        type: Number,
        required: false
    },
    atomicWeight: {
        type: Number,
        required: false
    },
    density: {
        type: Number,
        required: false
    },
    meltingPoint: {
        type: Number,
        required: false
    },
    boilingPoint: {
        type: Number,
        required: false
    },
    thermalCapacity: {
        type: Number,
        required: false
    },
    electroNegativity: {
        type: Number,
        required: false
    },
    abundanceInEarthCrust: {
        type: Number,
        required: false
    },
    commonlyFoundState: {
        type: String,
        required: false
    },
    wikipediaSearchTag: {
        type: String,
        required: true
    }
});


var chemicalModel = mongoose.model('chemical', chemicalSchema);


module.exports = {
    chemicalModel: chemicalModel
};
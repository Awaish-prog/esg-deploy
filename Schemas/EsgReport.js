
const mongoose = require('mongoose')

const EsgReport = new mongoose.Schema(
    {
        cin : { type: String, required: true },
        listedEntityName: { type: String },
        yearOfIncorporation: { type: String },
        registeredOfficeAddress: { type: String },
        corporateOfficeAddress: { type: String },
        email: { type: String },
        telephone: { type: String },
        website: { type: String },
        financialYear: { type: String },
        nameOfStockExchange: { type: String },
        paidUpCapital: { type: Number },
        queryContact: { type: String },
        reportBoundary: { type: String },
        nationalLocation: {
                plants: Number,
                offices: Number,
        },
        internationalLocation: {
                plants: Number,
                offices: Number,
        },
        typeOfCustomers: [ { type: String } ],
        permanentEmployees: {
                male: Number,
                female: Number
        },
        otherThanPermanentEmployees: {
                male: Number,
                female: Number
        },
        permanentWorkers: {
                male: Number,
                female: Number
        },
        otherThanPermanentWorkers: {
                male: Number,
                female: Number
        },
        diffAbledpermanentEmployees: {
                male: Number,
                female: Number
        },
        diffAbledotherThanPermanentEmployees: {
                male: Number,
                female: Number
        },
        diffAbledpermanentWorkers: {
                male: Number,
                female: Number
        },
        diffAbledotherThanPermanentWorkers: {
                male: Number,
                female: Number
        },
        grievancesPermanentWorkers: {
                yesno: String,
                details: String
        },
        grievancesOtherThanPermanentWorkers: {
                yesno: String,
                details: String
        },
        grievancesPermanentEmployees: {
                yesno: String,
                details: String
        },
        grievancesOtherThanPermanentEmployees: {
                yesno: String,
                details: String
        },
        attachedFiles: [ { type: String } ],
        submitted: { type: Boolean }
    }
)

const esgReport = mongoose.model("esgReport", EsgReport)
module.exports = esgReport
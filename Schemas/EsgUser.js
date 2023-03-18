
const mongoose = require('mongoose')

const EsgUser = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        reports: [ { type: String } ],
        sharedReports: [ { type: String } ]
    }
)

const esgUser = mongoose.model("esgUser", EsgUser)
module.exports = esgUser
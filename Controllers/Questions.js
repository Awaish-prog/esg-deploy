
const  { processInputData } = require("../Utils/ProcessData.js") 
const  { updateGeneralQuestions, updateLocationQuestions, updateTypeOfCustomers, updateWorkerQuestions, updateGrievanceQuestions } = require("../Utils/ProcessData.js")

const EsgReport = require("../Schemas/EsgReport.js")
const EsgUser = require("../Schemas/EsgUser.js")
const fs = require("fs")

let generalQuestions
let locationQuestions
let typeOfCustomers
let workerQuestions
let workerQuestionsDiffAbled
let grievanceQuestions


function initialiseQuestions(){
 generalQuestions = [
    {
        column1: "Corporate Identity Number (CIN) of the Listed Entity",
        dbKey: "cin",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Name of the Listed Entity",
        dbKey: "listedEntityName",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Year of Incorpaoration",
        dbKey: "yearOfIncorporation",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Registered office address",
        dbKey: "registeredOfficeAddress",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Corporate office Address",
        dbKey: "corporateOfficeAddress",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Email",
        dbKey: "email",
        column2: {
            cellType: "email",
            value: ""
        }
    },
    {
        column1: "Telephone",
        dbKey: "telephone",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Website",
        dbKey: "website",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Financial year for which reporting is being done",
        dbKey: "financialYear",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Name of Stock Exchanges(s) where shares are listed",
        dbKey: "nameOfStockExchange",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Paid-up Capital",
        dbKey: "paidUpCapital",
        column2: {
            cellType: "number",
            value: 0
        }
    },
    {
        column1: "Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report",
        dbKey: "queryContact",
        column2: {
            cellType: "text",
            value: ""
        }
    },
    {
        column1: "Reporting boundary - Are the disclosures under this report made on",
        dbKey: "reportBoundary",
        column2: {
            cellType: "text",
            value: ""
        }
    }
]

 locationQuestions = [
    {
        column1: {
            cellType: "label",
            value: "Location"
        },
        column2: {
            cellType: "label",
            value: "Number of plants"
        },
        column3: {
            cellType: "label",
            value: "Number of offices"
        },
        column4: {
            cellType: "label",
            value: "Total"
        }
    },
    {
        column1: {
            cellType: "label",
            value: "National"
        },
        column2: {
            cellType: "number",
            value: 0
        },
        column3: {
            cellType: "number",
            value: 0
        },
        column4: {
            cellType: "value",
            value: 0
        },
        dbKey: "nationalLocation"
    },
    {
        column1: {
            cellType: "label",
            value: "International"
        },
        column2: {
            cellType: "number",
            value: 0
        },
        column3: {
            cellType: "number",
            value: 0
        },
        column4: {
            cellType: "value",
            value: 0
        },
        dbKey: "internationalLocation"
    }
]

 typeOfCustomers = [
    [
        "S. No",
        "Type of Customers",
        "Action"
    ],
    [
        1,
        "",
        "Delete"
    ]
]

 workerQuestions = [
    [
        {
            cellType: "label",
            value: "Particulars"
        },
        {
            cellType: "label",
            value: "Total(A)"
        },
        {
            cellType: "label",
            value: "No.(B)"
        },
        {
            cellType: "label",
            value: "%(B/A)"
        },
        {
            cellType: "label",
            value: "No.(C)"
        },
        {
            cellType: "label",
            value: "%(C/A)"
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanent Employess(D)",
            dbKey: "permanentEmployees"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanent Employees(E)",
            dbKey: "otherThanPermanentEmployees"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Total Employees(D + E)"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanent Workers(F)",
            dbKey: "permanentWorkers"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanent Workers(G)",
            dbKey: "otherThanPermanentWorkers"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Total Workers(F + G)"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ]
]

 workerQuestionsDiffAbled = [
    [
        {
            cellType: "label",
            value: "Particulars"
        },
        {
            cellType: "label",
            value: "Total(A)"
        },
        {
            cellType: "label",
            value: "No.(B)"
        },
        {
            cellType: "label",
            value: "%(B/A)"
        },
        {
            cellType: "label",
            value: "No.(C)"
        },
        {
            cellType: "label",
            value: "%(C/A)"
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanent Employess(D)",
            dbKey: "diffAbledpermanentEmployees"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanent Employees(E)",
            dbKey: "diffAbledotherThanPermanentEmployees"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Total Employees(D + E)"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanent Workers(F)",
            dbKey: "diffAbledpermanentWorkers"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanent Workers(G)",
            dbKey: "diffAbledotherThanPermanentWorkers"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "number",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ],
    [
        {
            cellType: "label",
            value: "Total Workers(F + G)"
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
        {
            cellType: "value",
            value: 0
        },
    ]
]

 grievanceQuestions = [
    [
        {
            cellType: "label",
            value: ""
        },
        {
            cellType: "label",
            value: "Yes/No"
        },
        {
            cellType: "label",
            value: "Details"
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanents Workers"
        },
        {
            cellType: "select",
            options: [
                "N/A",
                "Yes",
                "No"
            ],
            value: "N/A",
            dbKey: "grievancesPermanentWorkers"
        },
        {
            cellType: "text",
            value: ""
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanents Workers"
        },
        {
            cellType: "select",
            options: [
                "N/A",
                "Yes",
                "No"
            ],
            value: "N/A",
            dbKey: "grievancesOtherThanPermanentWorkers"
        },
        {
            cellType: "text",
            value: ""
        },
    ],
    [
        {
            cellType: "label",
            value: "Permanent Employees"
        },
        {
            cellType: "select",
            options: [
                "N/A",
                "Yes",
                "No"
            ],
            value: "N/A",
            dbKey: "grievancesPermanentEmployees"
        },
        {
            cellType: "text",
            value: ""
        },
    ],
    [
        {
            cellType: "label",
            value: "Other than Permanent Employees"
        },
        {
            cellType: "select",
            options: [
                "N/A",
                "Yes",
                "No"
            ],
            value: "N/A",
            dbKey: "grievancesOtherThanPermanentEmployees"
        },
        {
            cellType: "text",
            value: ""
        },
    ],
]
}

async function getQuestions(req, res){
    if(req.params.cin === "default"){
        initialiseQuestions()
        res.json({status: 200, generalQuestions, locationQuestions, typeOfCustomers, workerQuestions, workerQuestionsDiffAbled, grievanceQuestions, attachedFiles: [], saved: false})
    }
    else{
        const esgReport = await EsgReport.findOne({cin : req.params.cin})
        if(!esgReport){
            res.json({status: 404})
        }
        else {
            initialiseQuestions()
            updateGeneralQuestions(generalQuestions, esgReport)
            updateLocationQuestions(locationQuestions, esgReport)
            updateTypeOfCustomers(typeOfCustomers, esgReport)
            updateWorkerQuestions(workerQuestions, esgReport)
            updateWorkerQuestions(workerQuestionsDiffAbled, esgReport)
            updateGrievanceQuestions(grievanceQuestions, esgReport)
            res.json({status: 200, generalQuestions, locationQuestions, typeOfCustomers, workerQuestions, workerQuestionsDiffAbled, grievanceQuestions, attachedFiles: esgReport.attachedFiles, saved: true})
        }
    }
}

async function saveResponse(req, res){
    const esgReportData = processInputData(req.body)
    const esgReport = await EsgReport.findOne({cin: esgReportData.cin})
    if(esgReport){
        if(req.body.newReport){
            res.json({status: 409})
            return
        }
        if(esgReport.submitted){
            res.json({status: 200})
            return
        }
        await EsgReport.updateOne({cin: esgReportData.cin}, esgReportData)
    }
    else{
        await EsgReport.create(esgReportData)
        const esgUser = await EsgUser.findOne({email: req.body.email})
        esgUser.reports.push(esgReportData.cin)
        esgUser.save()
    }
    res.json({status: 200})
}

async function getReports(req, res){
    const esgUser = await EsgUser.findOne({email: req.params.email})
    const pendingReports = []
    const submittedReports = []
    for(let i = 0; i < esgUser.reports.length; i++){
        const esgReport = await EsgReport.findOne({cin: esgUser.reports[i]})
        if(esgReport.submitted){
            submittedReports.push({
                cin: esgUser.reports[i],
                access: true
            })
        }
        else{
            pendingReports.push({
                cin: esgUser.reports[i],
                access: true
            })
        }
    }
    for(let i = 0; i < esgUser.sharedReports.length; i++){
        const esgReport = await EsgReport.findOne({cin: esgUser.sharedReports[i]})
        if(!esgReport.submitted){
            pendingReports.push({
                cin: esgUser.sharedReports[i],
                access: false
            })
        }
    }
    res.json({status: 200, pendingReports, submittedReports})
}

async function deleteFile(req, res){
    const esgReport = await EsgReport.findOne({cin: req.body.cin})
    let index = esgReport.attachedFiles.indexOf(req.body.fileName)
    esgReport.attachedFiles.splice(index, 1)
    fs.unlinkSync(`./public/${req.body.fileName}`)
    esgReport.save()
    res.json({status:200})
}

module.exports = { getQuestions, saveResponse, getReports, deleteFile }
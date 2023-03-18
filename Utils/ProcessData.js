function processInputData(data){
    const generalQuestionsKeys = ["cin", "listedEntityName", "yearOfIncorporation", "registeredOfficeAddress", "corporateOfficeAddress", "email", "telephone", "website", "financialYear", "nameOfStockExchange", "paidUpCapital", "queryContact", "reportBoundary"]

    const workerQuestionsKeys = ["permanentEmployees", "otherThanPermanentEmployees", "permanentWorkers", "otherThanPermanentWorkers"]

    const grievanceKeys = ["grievancesPermanentWorkers", "grievancesOtherThanPermanentWorkers", "grievancesPermanentEmployees", "grievancesOtherThanPermanentEmployees"]



    let workerIndex = 0

    const esgReportData = { }
    for(let i = 0; i < generalQuestionsKeys.length; i++){
        if(generalQuestionsKeys[i] === "paidUpCapital"){
            esgReportData[generalQuestionsKeys[i]] = Number(data.generalQuestions[i].column2.value)
        }
        else{
            esgReportData[generalQuestionsKeys[i]] = data.generalQuestions[i].column2.value
        }
    }
    esgReportData["nationalLocation"] = {
        plants: Number(data.locationQuestions[1].column2.value),
        offices: Number(data.locationQuestions[1].column3.value)
    }
    esgReportData["internationalLocation"] = {
        plants: Number(data.locationQuestions[2].column2.value),
        offices: Number(data.locationQuestions[2].column3.value)
    }
    esgReportData["typeOfCustomers"] = []
    for(let i = 1; i < data.typeOfCustomers.length; i++){
        esgReportData["typeOfCustomers"].push(data.typeOfCustomers[i][1])
    }

    for(let i = 1; i < data.workerQuestions.length; i++){
        if(data.workerQuestions[i][2].cellType === "number"){
            esgReportData[workerQuestionsKeys[workerIndex]] = {
                male: Number(data.workerQuestions[i][2].value),
                female: Number(data.workerQuestions[i][4].value)
            }
            workerIndex++
        }
    }

    workerIndex = 0

    for(let i = 1; i < data.workerQuestionsDiffAbled.length; i++){
        if(data.workerQuestionsDiffAbled[i][2].cellType === "number"){
            esgReportData["diffAbled" + workerQuestionsKeys[workerIndex]] = {
                male: Number(data.workerQuestionsDiffAbled[i][2].value),
                female: Number(data.workerQuestionsDiffAbled[i][4].value)
            }
            workerIndex++
        }
    }    
    
    for(let i = 1; i < data.grievanceQuestions.length; i++){
        esgReportData[grievanceKeys[i - 1]] = {
            yesno: data.grievanceQuestions[i][1].value,
            details: data.grievanceQuestions[i][2].value
        }
    }

    esgReportData.attachedFiles = data.attachedFiles

    esgReportData.submitted = data.submitted

    return esgReportData
}

function updateGeneralQuestions(generalQuestions, esgReport){
    for(let i = 0; i < generalQuestions.length; i++){
        generalQuestions[i].column2.value = esgReport[generalQuestions[i].dbKey]
    }
}

function updateLocationQuestions(locationQuestions, esgReport){
    for(let i = 1; i < locationQuestions.length; i++){
        locationQuestions[i].column2.value = esgReport[locationQuestions[i].dbKey].plants
        locationQuestions[i].column3.value = esgReport[locationQuestions[i].dbKey].offices
        locationQuestions[i].column4.value = esgReport[locationQuestions[i].dbKey].plants + esgReport[locationQuestions[i].dbKey].offices
    }
}

function updateTypeOfCustomers(typeOfCustomers, esgReport){
    for(let i = 0; i < esgReport.typeOfCustomers.length; i++){
        if(i + 1 >= typeOfCustomers.length){
            typeOfCustomers.push([i + 1, "", "Delete"])
        }
        typeOfCustomers[i + 1][1] = esgReport.typeOfCustomers[i]
    }
}

function updateWorkerQuestions(workerQuestions, esgReport){
    for(let i = 1; i < workerQuestions.length; i++){
        if("dbKey" in workerQuestions[i][0]){
            workerQuestions[i][2].value = esgReport[workerQuestions[i][0].dbKey].male
            workerQuestions[i][4].value = esgReport[workerQuestions[i][0].dbKey].female
            workerQuestions[i][1].value = esgReport[workerQuestions[i][0].dbKey].male + esgReport[workerQuestions[i][0].dbKey].female
            workerQuestions[i][3].value = ((esgReport[workerQuestions[i][0].dbKey].male / workerQuestions[i][1].value) * 100).toFixed(2) == "NaN" ?
            0 :
            ((esgReport[workerQuestions[i][0].dbKey].male / workerQuestions[i][1].value) * 100).toFixed(2)
            workerQuestions[i][5].value = ((esgReport[workerQuestions[i][0].dbKey].female / workerQuestions[i][1].value) * 100).toFixed(2) == "NaN" ?
            0 :
            ((esgReport[workerQuestions[i][0].dbKey].female / workerQuestions[i][1].value) * 100).toFixed(2)
        }
        else{
            workerQuestions[i][1].value = workerQuestions[i - 1][1].value + workerQuestions[i - 2][1].value
            workerQuestions[i][2].value = workerQuestions[i - 1][2].value + workerQuestions[i - 2][2].value
            workerQuestions[i][3].value = ((Number(workerQuestions[i - 1][3].value) + Number(workerQuestions[i - 2][3].value)) / 2).toFixed(2) == "NaN" ?
            0 :
            ((Number(workerQuestions[i - 1][3].value) + Number(workerQuestions[i - 2][3].value)) / 2).toFixed(2)
            
            workerQuestions[i][4].value = workerQuestions[i - 1][4].value + workerQuestions[i - 2][4].value
            workerQuestions[i][5].value = ((Number(workerQuestions[i - 1][5].value) + Number(workerQuestions[i - 2][5].value)) / 2).toFixed(2) == "NaN" ?
            0 :
            ((Number(workerQuestions[i - 1][5].value) + Number(workerQuestions[i - 2][5].value)) / 2).toFixed(2)
        }
    }
}

function updateGrievanceQuestions(grievanceQuestions, esgReport){
    for(let i = 1; i < grievanceQuestions.length; i++){
        grievanceQuestions[i][1].value = esgReport[grievanceQuestions[i][1].dbKey].yesno
        grievanceQuestions[i][2].value = esgReport[grievanceQuestions[i][1].dbKey].details
    }
}

module.exports = { processInputData, updateGeneralQuestions, updateLocationQuestions, updateTypeOfCustomers, updateWorkerQuestions, updateGrievanceQuestions }

const EsgUser = require("../Schemas/EsgUser.js")
const EsgReport = require("../Schemas/EsgReport.js")
const jwt = require("jsonwebtoken")
require('dotenv').config()

async function login(req, res){
    const esgUser = await EsgUser.findOne({email: req.body.email})
    if(esgUser && esgUser.password === req.body.password){
        const token = jwt.sign({
            email: req.body.email
        }, process.env.KEY);
        res.json({status: 200, token})
        return
    }
    else if(esgUser){
        res.json({status: 401})
        return
    }
    else{
        res.json({status: 404})
        return
    }
}

async function signUp(req, res){

    if(await EsgUser.findOne({email: req.body.email})){
        res.json({status: 403})
        return
    }

    const user = await EsgUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        reports: [],
        sharedReports: []
    })
    const token = jwt.sign({
        email: req.body.email
    }, process.env.KEY);
    res.status(201).json({ status: 201, token })
}

async function inviteSomeone(req, res){
    const esgUser = await EsgUser.findOne({email: req.body.inviteEmail})
    const esgReport = await EsgReport.findOne({cin: req.body.cin})
    if(esgUser && esgReport){
        if(esgUser.sharedReports.includes(req.body.cin)){
            res.json({status: 200})
            return
        }
        esgUser.sharedReports.push(req.body.cin)
        esgUser.save()
        res.json({status: 200})
    }
    else if(!esgUser){
        res.json({status: 403})
    }
    else{
        res.json({status:404})
    }
    
}

module.exports = { login, signUp, inviteSomeone }
const bcrypt = require('bcrypt')
const employeeModel = require('../models/employeeModel')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {

    try {
        /*----------- Validation---------- */
        let data = req.body
        let { name, email, password, role } = data
        let hashPassword = await bcrypt.hash(password, 10)
        data.password = hashPassword

        /*-----------Business Logic --------- */
        let createData = await employeeModel.create(data)
        return res.status(201).send("Created Sucessfully")

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const signIn = async (req, res) => {

    try {
        /*----------- Validation---------- */
        let data = req.body
        let { email, password } = data

        let findEmail = await employeeModel.findOne({ email: email })
        if (!findEmail) { return res.status(400).send("Please Provide valid Email") }
        let checkPassword = await bcrypt.compare(password, findEmail.password)
        if (!checkPassword) { return res.status(400).send("Please Provide valid Password") }

        /*----------- Business Logic---------- */
        let token = jwt.sign({ role: findEmail.role }, "GodIsGreat")
        res.cookie('token', token, { httpOnly: true })
        return res.send("User is authenticated and Cookie is Set ")
        //add timer to expiry

    } catch (error) {
        return res.status(500).send(error.message)
    }
}
module.exports = { signUp, signIn }
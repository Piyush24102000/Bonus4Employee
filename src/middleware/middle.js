const jwt = require("jsonwebtoken")

const adminMiddle = async (req, res, next) => {
    let token = req.cookies.token
    if (!token) { return res.status(404).send("NO Token found") }

    let decodeToken = jwt.verify(token, "GodIsGreat")
    if (decodeToken.role == "Admin") {
        next()
    }
    else {
        return res.status(403).send("You are not Authorized to perform this Operation")
    }
}
const superMiddle = async (req, res, next) => {
    let token = req.cookies.token
    if (!token) { return res.status(404).send("NO Token found") }

    let decodeToken = jwt.verify(token, "GodIsGreat")
    if (decodeToken.role == "Superadmin") {
        next()
    }
    else {
        return res.status(403).send("You are not Authorized to perform this Operation")
    }
}
const employeeMiddle = async (req, res, next) => {
    let token = req.cookies.token
    if (!token) { return res.status(404).send("NO Token found") }

    let decodeToken = jwt.verify(token, "GodIsGreat")
    if (decodeToken.role == "Employee") {
        next()
    }
    else {
        return res.status(403).send("You are not Authorized to perform this Operation")
    }
}
module.exports = { adminMiddle, superMiddle, employeeMiddle }
const mongoose = require('mongoose')
const employeeSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "Employee"
    }
})
module.exports = mongoose.model('employee', employeeSchema)
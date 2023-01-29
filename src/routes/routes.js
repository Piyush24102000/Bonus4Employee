const express = require('express')
const router = express.Router()
const { signUp, signIn } = require('../controller/signController')
const { addCourse, viewCourse, deleteCourse, approveCourse, updateCourse } = require('../controller/courseController')
const { adminMiddle, employeeMiddle, superMiddle } = require('../middleware/middle')

/* Sign Routes */
router.post('/signup', signUp)
router.post('/signin', signIn)

/* Employee Routes */
router.get('/view',employeeMiddle,viewCourse)

/* Admin Routes */
router.post('/add',adminMiddle,addCourse)
router.patch('/update/:id',adminMiddle,updateCourse)
router.patch('/delete/:id',adminMiddle,deleteCourse)

/* Super Admin Routes */
router.patch('/approve/:id',superMiddle,approveCourse)

module.exports = router
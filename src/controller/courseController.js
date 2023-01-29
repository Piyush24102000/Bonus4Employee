const courseModel = require('../models/courseModel')

/* -------------Employee Section------------ */
const viewCourse = async (req, res) => {
    try {
        let viewCourse = await courseModel.find({ approved: true, isDeleted: false }).sort({ category: 1 })
        return res.status(200).send({ data: viewCourse })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

/* -------------Admin Section--------------  */
const addCourse = async (req, res) => {
    try {
        let data = req.body

        let createData = await courseModel.create(data)
        return res.status(201).send({ data: createData })
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateCourse = async (req, res) => {
    try {
        let data = req.body
        let id = req.params.id
        let checkCourseExists = await courseModel.findById(id)
        if (!checkCourseExists) {
            return res.status(404).send("Course Not Found")
        }
        /* ------------Business logic------------ */
        let arr = (Object.keys(data))
        if (arr.length == 1 && arr[0] == "topics") {
            let update = await courseModel.findByIdAndUpdate(id, { $addToSet: { topics: data.topics } }, { new: true })
            return res.status(200).send({ data: update })
        }
        let update1 = await courseModel.findByIdAndUpdate(id, { $set: { title: data.title, description: data.description, video: data.video, duration: data.duration, category: data.category }, $addToSet: { topics: data.topics } }, { new: true })

        return res.status(200).send({ data: update1 })

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const deleteCourse = async (req, res) => {
    try {
        let id = req.params.id
        let checkCourseExists = await courseModel.findById(id)
        if (!checkCourseExists) {
            return res.status(404).send("Course Not Found")
        }

        await courseModel.findByIdAndUpdate(id, { $set: { isDeleted: true } })
        return res.status(200).send("Course Deleted Successfully")
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

/* -------------Super Admin Section--------------  */
const approveCourse = async (req, res) => {
    try {
        let id = req.params.id
        let checkCourseExists = await courseModel.findById(id)
        if (!checkCourseExists) {
            return res.status(404).send("Course Not Found")
        }
        await courseModel.findByIdAndUpdate(id, { $set: { approved: true } })
        return res.status(200).send("Course Approved Successfully")

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = { addCourse, updateCourse, deleteCourse, approveCourse, viewCourse }
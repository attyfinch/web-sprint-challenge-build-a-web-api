// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

// GET Requests

router.use('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500)
        })
})

router.use('/:id', (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500)
        })
})


router.post('/', (req, res, next) => {
    const { name, description } = req.body;

    Projects.insert({name: name, description: description})
        .then(something => {
            console.log(something)
        })
        .catch(err => {
            res.status(500).json({message: "Something broke"})
        })

})



module.exports = router;
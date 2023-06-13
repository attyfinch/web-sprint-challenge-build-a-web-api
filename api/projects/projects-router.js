// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            // console.log('test')
            res.status(200).json(projects)
        })
        .catch(next)
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

router.get('/:id/actions', (req, res, next) => {
    
    Projects.getProjectActions(req.params.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch(next)
})

router.post('/', (req, res, next) => {
    const { name, description, completed } = req.body;
    const newProject = {
        name: name,
        description: description,
        completed: completed
    }

    Projects.insert(newProject)
        .then(project => {
            Projects.get(project.id)
                .then(project => {
                    res.status(201).json(project)
                })
        })
        .catch(next)
});

router.put('/:id', (req, res, next) => {
    const updatedProject = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    }

    Projects.update(req.params.id, updatedProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({message: "Project successfully dleted"})
        })
        .catch(next)
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: "Something broke in the projects-router"
    })
});



module.exports = router;
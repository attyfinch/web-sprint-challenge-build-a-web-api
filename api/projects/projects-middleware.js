// add middlewares here related to projects
const Projects = require('./projects-model');

function validateID(req, res, next) {
    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(404).json({message: `Project with ID ${id} does not exist`})
            } else {
                next();
            }
        })

}

function validateBody(req, res, next) {
    const { name, description, completed } = req.body;
    const updatedProject = {
        name: name,
        description: description,
        completed: completed
    }

    if (
    name === undefined || !name || name.trim().length === 0 ||
    description === undefined || !description || description.trim().length === 0 ||
    completed === undefined
    ) {
        res.status(400).json({message: "All fields required"})
    } else {
        next();
    }
}

module.exports = { validateID, validateBody }
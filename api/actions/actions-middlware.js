// add middlewares here related to actions
const Actions = require('./actions-model');

function validateID (req, res, next) {
    const { id } = req.params;
    const action = Actions.get(id);

    if (action) {
        next();
    } else {
        res.status(404).json({message: "That action ID does not exist"})
    }
}

function validateBody (req, res, next) {
    const { project_id, description, notes, completed } = req.body;

    if (
        !project_id ||
        !description ||
        !notes
    ) {
        res.status(400).json({
            message: "Project ID, description, notes, and completed status are required fields"
        })
    } else {
        next();
    }
}

module.exports = { validateID, validateBody }

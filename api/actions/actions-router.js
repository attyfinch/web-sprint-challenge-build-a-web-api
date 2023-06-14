// Write your "actions" router here!
const express = require('express');
const { validateID, validateBody } = require('./actions-middlware');

const Actions = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get().then(action => {
        res.status(200).json(action);
    })
    .catch(next)
});

router.get('/:id', validateID, (req, res, next) => {
    const { id } = req.params;
    
    Actions.get(id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else res.status(404).json(`There is no action with id ${id}`)            
        })
        .catch(next)
});

router.post('/', validateBody, (req, res, next) => {
    const { project_id, description, notes } = req.body;
    Actions.insert({project_id: project_id, description: description, notes: notes})
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
});

router.put('/:id', validateBody, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedAction = {
            project_id: req.body.project_id,
            description: req.body.description,
            notes: req.body.notes,
            completed: req.body.completed
        }
        const updatePost = await Actions.update(id, updatedAction);
        res.status(200).json(updatePost)

    } catch (err) {
        next(err)
    }

});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({message: `Action with id ${id} has been deleted`})
        })
        .catch(err => {
            next(err)
        })
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "Something broke in the actions router."
    });
});


module.exports = router;
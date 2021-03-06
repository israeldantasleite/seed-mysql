module.exports = app => {
    const User = require('../models/users')
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/users')(app)
    const Validate = require('../../helpers/validate')
    return {
        create: (req, res) =>
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password', 'types_user_id')
                .then(Business.create)
                .then(Persistence.create(res))
                .catch(err => res.status(500).json(err)),
        update: (req, res) =>
            Validate.validateBody(req.body, 'name', 'email', 'phone', 'password')
                .then(Business.update(res)(req.params))
                .catch(err => res.status(500).json(err)),
        listAll: (req, res) => Persistence.listAll(res),
        listOne: (req, res) => Persistence.listOne(req.params, res),
        delete: (req, res) => Persistence.delete(req.params)
    }
}

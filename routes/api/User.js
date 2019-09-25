const express = require('express');
const router = express.Router();
var Users = require('mongoose').model('Users');
var argon2 = require('argon2');

router.get('/', (req, res) => {
  Users.find().then(users => {
    return res.status(200).json({users})
  })
})

router.post('/', (req, res) => {
  users = new Users(req.body)

  users.save(function(err, users) {
        if (err) return res.status(422).json({status: 422, message: err.message})

        return res.status(200).json({status: 200, message: 'Created', users})
    })
})

router.put('/:id', (req, res) => {
  Users.findOneAndUpdate({_id:  req.params.id}, req.body, (err, user) => {
    if (err) return res.status(422).json({err: err.message})

    return res.status(200).json({message:"Updated", user})
  }).catch(err => {return res.status(422).json({error: err.message})})
})

router.delete('/:id', (req, res) => {
  Users.findOneAndDelete({_id: req.params.id}, (err, user) => {
    if (err) return res.status(422).json({message: err.message})
    if (user) return res.status(200).json({message: 'deleted', user})
    return res.status(422).json({message: 'user not found!', user})

  }).catch(err => {return res.status(422).json({message: err.message})})
})

module.exports = router

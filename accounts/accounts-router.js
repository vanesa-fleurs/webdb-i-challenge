const router = require('express').Router();
const db = require('../data/dbConfig.js')

router.get('/', (req,res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => res.status(500).json({message: `error in retrieveing accounts`}))
})

router.post('/', validatePost, (req, res) => {
    const newAccount = req.body;

    db('accounts').insert(newAccount, 'id')
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error adding this new account!`})
        })
})

router.get('/:id', (req,res) => {
    const { id }  = req.params;
    db('accounts').where({id})
        .then(user => {
            res.status(200).json(user[0]);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error getting user account!`})
        });
})


router.put('/:id', (req,res) => {
    const { id } = req.params;
    const updates = req.body;

    db('accounts').where({id}).update(updates)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error updating the user's account!`})
        });
})

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    db('accounts').where({id}).delete(id)
        .then(deletedAccount => {
            res.status(204).json(deletedAccount)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: `error deleting the account!`})
        });
})

async function validatePost(req, res, next) {
    const { name } = req.body;
    const { budget } = req.body;

    if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "Missing user data." });
    } 
    if(!name) {
        res.status(400).json({ message: "Missing user name." });
    }
    if(!budget) {
        res.status(400).json({ message: "Missing user budget." });
    }
    if(typeof name !== "string"){
        return res.status(400).json({error: `must provide string for the user's name`});
    }
    if(typeof budget !== "number"){
        return res.status(400).json({error: `must provide a number for user's budget`});
    }
    req.body = {name, budget}
    next();
}


module.exports = router;
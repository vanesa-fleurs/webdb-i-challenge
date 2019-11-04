const router = require('express').Router();
const db = require('../data/dbConfig.js')

router.get('/', (req,res) => {
    db.select('*').from('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => res.status(500).json({message: `error in retrieveing accounts`}))
})



module.exports = router;
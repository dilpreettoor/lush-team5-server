const express = require('express');
const router = express.Router();
const fs = require('fs'); // fileSystem module

// GET entire store array
router.get('/', (req, res) => {
    fs.readFile('./data/stores.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return res.send('Error reading stores'); // send error if it exists
        }
        res.json(JSON.parse(data)); // send back array of stores
    });
});

// GET a single store by id
router.get('/:id', (req, res) => {
    fs.readFile('./data/stores.json', 'utf8', (err, data) => {
        if (err) {
            return res.send('Error getting store with the id of ' + req.params.id); // send error if it exists
        }

        const stores = JSON.parse(data); // parse JSON data and save in stores variables

        // search array for store using req.params.id
        const foundStore = stores.find((store) => store.id == req.params.id);

        // if found, send store data back, otherwise send a 404 status
        if (foundStore) {
            res.json(foundStore);
        } else {
            res.status(404).send(`No store with the id ${req.params.id} found`);
        }
    });
});

module.exports = router;
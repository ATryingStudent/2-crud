const express = require('express');

const router = express.Router();

// Models
const Model = require('../Models/usermodel.js');

//==============================================================
// CREATE
//==============================================================
//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        password: req.body.password
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

//==============================================================
// Read
//==============================================================
//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//==============================================================
// Update
//==============================================================
//Update PUT
router.put('/putupdate/:id', async (req, res) => {
    try {
        const updatedUser = await Model.updateOne(
            { _id: req.params.id }, 
            { $set: { 
                name: req.body.name,
                password: req.body.password 
            } }
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({ message:err });
    }
});

// Update PATCH
router.patch('/patchupdate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//==============================================================
// Delete
//==============================================================
//Delete by ID Method
router.delete('/deleteOne/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`${data.name} === deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Delete All
router.delete('/deleteAll', async (req, res) => {
    try {
        await Model.deleteMany({})
        res.send(`All Users deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
module.exports = router;
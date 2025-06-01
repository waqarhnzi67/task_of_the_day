const express = require('express');
const router = express.Router();
const Task = require('./schemas/tasks');

router.post('/', async (req, res) => {
    try {
      const { title, status, date } = req.body;
      const newTask = new Task({ title, status, date });
      await newTask.save();
      res.status(201).json(newTask);
    
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(404).json({message: 'Unabe to get the data!'})
    }
  });


  router.delete('/:id', async (req, res) => {
    const id = req.params.id  
    
    try {
      const deleteTask = await Task.findByIdAndDelete(req.params.id);
      if(!deleteTask){
        res.status(404).json({message: "Task not found!"})
      }
      res.status(200).json({message: "Task deleted", task: deleteTask})
    } catch (error) {
      res.status(500).json({error: err.message})
    }
  })


module.exports = router;
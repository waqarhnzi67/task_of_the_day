const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    title : {type: String, required: true},
    status : {type: String, required: true},
    date : {type: Date, require: true},
})

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

module.exports = Task;
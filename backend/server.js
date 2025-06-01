const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database')

const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.use('/api/tasks', require('./routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res)=>{
    try {
        console.log(`Server is listening on port ${PORT}`);
    } catch (error) {
        console.log("Backend server error ", error);
    }
})
const express = require('express');
const connectDB = require('./db/database')
const cors = require('cors')
require('dotenv').config();


const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes'))
const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
    try{
        console.log(`Server is running on PORT ${PORT}`);
    }catch(err){
        console.log(`Failed to run server on PORT ${PORT}`);
        
    }
})
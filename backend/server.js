require('dotenv').config();



const express = require ('express');

const app = express();

const port = 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/user', require('./src/routes/userRoutes'));



app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})

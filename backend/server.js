require('dotenv').config();
const express = require ('express');
const errorHandler = require('./src/middleware/errorHandler')

const app = express();

const port = 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/task', require('./src/routes/taskRoutes'));


app.use( errorHandler );

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})

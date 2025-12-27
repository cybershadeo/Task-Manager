require('dotenv').config();
const express = require ('express');
const cors = require ('cors');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

const port = 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/task', require('./src/routes/taskRoutes'));


app.use( errorHandler );

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

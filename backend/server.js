require('dotenv').config();
const express = require ('express');
const errorHandler = require('./src/middleware/errorHandler')

const app = express();

const port = 5002;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/task', require('./src/routes/taskRoutes'));


app.use( errorHandler );

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

/* Cross layer Optimization
  1:Creating a new user endpoint that:
     i: displays total category/task/subtask count 
     ii: displays progress of task/subtask
     iii: recent activity
     iv: categories with their task count and subtask count

  2: A category request that returns:
     i: category info 
     ii: task related to categroy
     ii: subtask related to task
     iv: completion statistics
     

  3: Bulk optimizatio:
     i: Move multiple task between categories and vice versa for task and subtask
     ii: Mark multiple subtasks/task complete
     iii: Delete multiple items at once
*/       
require('dotenv').config()

const express = require("express");

const taskRouter = require("./routes/taskRouter");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

// GET
// POST
// PATCH/PUT
// DELETE

// urls-endpoints
// /task- all of the task
// /tasks/create - create a new task - POST
// /tasks/id - each task -GET
// /tasks/id - delete task - DELETE
// /task/id - update task - PATCH

const dbURL = `${process.env.DB_URL}`;
  

app.use(morgan("dev"));
app.use(cors())



app.use(express.json()) //converts incoming request.body

// app.use((req, res, next) => {
//   console.log("i run everytime...");
//   next();
// });

app.use("/tasks", taskRouter);

// app.get('/tasks/', (req, res)=>{

//     console.log('a request just came in...');
//     res.status(200).json({title: 'All task on the DB'})

// })

// app.post('/task-create', (req, res)=>{
//     console.log('a post request just came in');
//     res.status(200).json({title: 'creat a new task'})
// })

// app.get('/task/id', (req, res)=>{
//     res.status(400).json({title: 'Get Each Task'})
// })

app.use((req, res, next) => {
  res.status(404).json({ message: "Url not found" });
});


// middlewares

const start = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("DB Connected!");
    app.listen(port, console.log(`Server is now running on port 3000`));
  } catch (error) {
    console.log(`could not connect because`);
    console.log(error);
  }
};

start();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  console.log(req.headers.bicicleta)
  const id = req.params.id;
  const updatedTask = req.body;
  tasks = tasks.map(task => {
    if(task.id == id){
        return {...task, nome: updatedTask.nome }
    }
    return task;
  })
  res.json(updatedTask);
});

app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter(task => task.id != id )
  
  res.json({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

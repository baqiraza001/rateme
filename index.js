require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./controllers/users');
const departmentsRoutes = require('./controllers/departments');
const employeesRoutes = require('./controllers/employees');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', usersRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/employees', employeesRoutes);

mongoose.connect(process.env.MONGODB_CONNECTION_URI).then(() => {
  console.log('database connected successfully')
}).catch( error => {
  console.log(error)
})

app.get('/test', (req, res) => {
  res.send('tesing our first route')
})

app.all('*', (req, res) => {
  res.send('Page Not Found')
});

app.listen(5000, function() {
  console.log('server is listening at 5000')
})
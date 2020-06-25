const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const methodOverride = require('method-override')
// const routes = require('./routes')
const PORT = 3000
const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname : 'hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.get('/' , (req, res) => {
  res.send('hihi')
})

//login register

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.get('/users/register', (req, res) => {
  res.render('register')
  
})

app.post('/users/login', (req, res) => {
  res.send('login')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})


app.listen(PORT, () => {
  console.log('now is running')
})
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
const session = require('express-session')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname : 'hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.get('/' , (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos }))
    .catch(error => res.status(422).json(error))
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
  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        console.log('User already exists')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
})

app.get('/users/logout', (req, res) => {
  res.send('logout')
})

//detail

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() })
    )
    .catch(error => console.log(error))
})

app.listen(PORT, () => {
  console.log('now is running')
})
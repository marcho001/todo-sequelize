const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = 3000
const db = require('./models')
const Todo = db.Todo
const session = require('express-session')
const usePassport = require('./config/passport')



app.engine('hbs', exphbs({ defaultLayout: 'main', extname : 'hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

app.get('/' , (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then(todos => res.render('index', { todos }))
    .catch(error => res.status(422).json(error))
})
//login register



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
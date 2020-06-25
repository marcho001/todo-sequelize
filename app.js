const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const methodOverride = require('method-override')
// const routes = require('./routes')
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname : 'hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))

app.get('/' , (req, res) => {
  res.send('hihi')
})

app.listen(PORT, () => {
  console.log('now is running')
})
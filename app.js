const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const PORT = 3000
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')



app.engine('hbs', exphbs({ defaultLayout: 'main', extname : 'hbs'}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log('now is running')
})
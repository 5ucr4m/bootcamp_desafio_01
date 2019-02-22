const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure({
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  req.query.age ? next() : res.redirect('/')
}

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.post('/check', (req, res) => {
  req.body.age >= 18
    ? res.redirect(`/major?age=${req.body.age}`)
    : res.redirect(`/minor?age=${req.body.age}`)
})
app.get('/major', checkAge, (req, res) => {
  res.render(`pages/major`, { age: req.query.age })
})
app.get('/minor', checkAge, (req, res) => {
  res.render(`pages/minor`, { age: req.query.age })
})

app.listen(3000)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./app/queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const cors = require('cors')
app.use(cors());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', db.getRecipe)
app.get('/users/:id', db.getRecipeById)
app.post('/users', db.createRecipe)
app.put('/users/:id', db.updateRecipe)
app.delete('/users/:id', db.deleteRecipe)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

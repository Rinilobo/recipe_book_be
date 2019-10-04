const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ReceipeBookDb',
  password: '2209',
  port: 5433,
})

const getRecipe = (request, response) => {
  pool.query('SELECT * FROM recipies', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
  // console.log('im here');
}

const getRecipeById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM recipies WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createRecipe = (request, response) => {
  const { description } = request.body
  pool.query('INSERT INTO recipies (description) VALUES ($1)', [description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).json(results.rows)
  })
}

const updateRecipe = (request, response) => {
  const id = parseInt(request.params.id)
  console.log('@@@@@@@@@@@@@@@', id)
  const { description } = request.body

  pool.query(
    'UPDATE recipies SET description = $1  WHERE id = $2',
    [description, id],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error
      }
      console.log('im here success')
      response.status(200).json(results.rows)
    }
  )
}

const deleteRecipe = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM recipies WHERE id = $1', [id], (error, results) => {
    response.status(200).json(results.rows)
  })
  console.log('im here delete');
}

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
}

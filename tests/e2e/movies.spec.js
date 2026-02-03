import { test } from '../support'

import { executeSQL } from '../support/database'

const data = require('../support/fixtures/movies.json')

test('deve poder cadastrar um novo filme', async ({ page }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)
  
  const movie = data.movies[randomMovie]
  
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await page.login.visit()
  await page.login.submitLogin('admin@zombieplus.com', 'pwd123')
  await page.movies.isLoggedIn()

  await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

  await page.toast.haveText('UhullCadastro realizado com sucesso!')
})
import { test } from '../support'

import { executeSQL } from '../support/database'

const data = require('../support/fixtures/movies.json')

test('deve poder cadastrar um novo filme', async ({ page }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)

  const movie = data.movies[randomMovie]

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  )

  await page.toast.haveText('UhullCadastro realizado com sucesso!')
})

test('não deve poder cadastrar um filme duplicado', async ({ page }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)

  const movie = data.movies[randomMovie]

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  )

  await page.toast.haveText('UhullCadastro realizado com sucesso!')

  await page.movies.create(
    movie.title,
    movie.overview,
    movie.company,
    movie.release_year,
    movie.cover,
    movie.featured
  )

  await page.toast.haveText('Oops!Este conteúdo já encontra-se cadastrado no catálogo')
})

test('não deve cadastrar um filme sem preencher os campos obrigatórios', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertHaveText([
    'Por favor, informe o título.',
    'Por favor, informe a sinopse.',
    'Por favor, informe a empresa distribuidora.',
    'Por favor, informe o ano de lançamento.'
  ])
})
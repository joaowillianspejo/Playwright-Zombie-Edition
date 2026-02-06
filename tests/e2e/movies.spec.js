import { test } from '../support'

import { executeSQL } from '../support/database'

const data = require('../support/fixtures/movies.json')

test('deve poder cadastrar um novo filme', async ({ page }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)

  const movie = data.movies[randomMovie]

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.create(movie)

  const message = `O filme '${movie.title}' foi adicionado ao catálogo.`
  await page.modal.haveText(message)
})

test('deve poder remover um filme', async ({ page, request }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)

  const movie = data.movies[randomMovie]

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await request.api.postMovie(movie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.removeMovie(movie.title)

  const message = 'Filme removido com sucesso.'
  await page.modal.haveText(message)
})

test('não deve poder cadastrar um filme duplicado', async ({ page, request }) => {
  const randomMovie = Math.floor(Math.random() * data.movies.length)

  const movie = data.movies[randomMovie]

  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`)

  await request.api.postMovie(movie)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.create(movie)

  const message = `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  await page.modal.haveText(message)
})

test('não deve cadastrar um filme sem preencher os campos obrigatórios', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.movies.goForm()
  await page.movies.submit()

  await page.movies.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório'
  ])
})
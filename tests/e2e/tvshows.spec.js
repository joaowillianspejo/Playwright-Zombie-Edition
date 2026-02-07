import { test } from '../support'

import { executeSQL } from '../support/database'

const data = require('../support/fixtures/tvshows.json')

test('deve poder cadastrar uma nova série', async ({ page }) => {
  const randomTVShow = Math.floor(Math.random() * data.tvshows.length)

  const tvshow = data.tvshows[randomTVShow]

  await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}'`)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.tvshows.create(tvshow)

  const message = `A série '${tvshow.title}' foi adicionada ao catálogo.`
  await page.modal.haveText(message)
})

test('não deve poder cadastrar uma série duplicada', async ({ page, request }) => {
  const randomTVShow = Math.floor(Math.random() * data.tvshows.length)

  const tvshow = data.tvshows[randomTVShow]

  await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}'`)

  await request.api.postTVShow(tvshow)

  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.tvshows.create(tvshow)

  const message = `O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
  await page.modal.haveText(message)
})

test('não deve cadastrar uma série sem preencher os campos obrigatórios', async ({ page }) => {
  await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

  await page.tvshows.goForm()
  await page.tvshows.submit()

  await page.tvshows.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório',
    'Campo obrigatório (apenas números)'
  ])
})
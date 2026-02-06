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
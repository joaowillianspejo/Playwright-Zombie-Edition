import { test } from '../support';

test('deve logar como adiministrador com sucesso', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('admin@zombieplus.com', 'pwd123')

  await page.login.isLoggedIn()

})

test('não deve logar com senha incorreta', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('admin@zombieplus.com', 'abc123')

  const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'

  await page.toast.haveText(message)
})

test('não deve logar com um email inválido', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('zombieplus.com', 'abc123')
  await page.login.alertHaveText('Email incorreto')

})

test('não deve logar sem o preenchimento do email', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('', 'abc123')

  await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar sem o preenchimento da senha', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('admin@zombieplus.com', '')

  await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar sem nenhum campo preenchido', async ({ page }) => {

  await page.login.visit()

  await page.login.submitLogin('', '')

  await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
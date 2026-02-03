import { fakerPT_BR as faker } from '@faker-js/faker';

import { test, expect } from '../support'

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const name = faker.person.fullName()
  const email = faker.internet.email({ firstName: name.split(' ')[0] , lastName: name.split(' ')[1] })

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(name, email)

  await page.toast.haveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!')

});

test('não deve cadastrar um lead com email já existente', async ({ page, request }) => {
  const name = faker.person.fullName()
  const email = faker.internet.email({ firstName: name.split(' ')[0] , lastName: name.split(' ')[1] })

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: name,
      email: email
    }
  })

  await expect(newLead.status()).toBe(201)

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(name, email)

  await page.toast.haveText('O endereço de e-mail fornecido já está registrado em nossa fila de espera.')

});

test('não deve cadastrar um lead com email inválido', async ({ page }) => {

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('João Willian', 'joaowillian.spejo')

  await page.landing.alertHaveText('Email incorreto')
});

test('não deve cadastrar um lead sem o nome', async ({ page }) => {

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'joaowillian.spejo@outlook.com')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar um lead sem o email', async ({ page }) => {

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('João Willian', '')

  await page.landing.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar um lead sem nenhum campo preenchido', async ({ page }) => {

  await page.landing.visit()

  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
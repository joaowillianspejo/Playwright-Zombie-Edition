import { fakerPT_BR as faker } from '@faker-js/faker';

import { test, expect } from '../support'

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const name = faker.person.fullName()
  const email = faker.internet.email({ firstName: name.split(' ')[0] , lastName: name.split(' ')[1] })

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(name, email)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.modal.haveText(message)

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

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(name, email)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.modal.haveText(message)

});

test('não deve cadastrar um lead com email inválido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('João Willian', 'joaowillian.spejo')

  await page.leads.alertHaveText('Email incorreto')
});

test('não deve cadastrar um lead sem o nome', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'joaowillian.spejo@outlook.com')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar um lead sem o email', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('João Willian', '')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar um lead sem nenhum campo preenchido', async ({ page }) => {

  await page.leads.visit()

  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
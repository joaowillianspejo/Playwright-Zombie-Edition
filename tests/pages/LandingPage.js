import { expect } from '@playwright/test';

export class LandingPage {
  constructor(page) {
    this.page = page
  }

  async visit() {
    await this.page.goto('http://localhost:3000/')
  }

  async openLeadModal() {
    await this.page.getByRole('button', { name: /Aperte o play/ }).click()

    // Buscar o elemento por xpath
    // await page.click('//button[text()="Aperte o play... se tiver coragem"]')

    await expect(
      this.page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera')
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder('Informe seu nome').fill(name)

    // Buscar o elemento por id
    // await page.locator('#name').fill('João Willian')

    // Buscar o elemento pelo atributo name
    // await page.locator('input[name="name"]').fill('João Willian')

    await this.page.getByPlaceholder('Informe seu email').fill(email)

    await this.page.getByTestId('modal')
      .getByRole('button', { name: 'Quero entrar na fila!' }).click()
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}
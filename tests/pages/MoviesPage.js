import { expect } from '@playwright/test';

export class MoviesPage {
  constructor(page) {
    this.page = page
  }

  async isLoggedIn() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.page).toHaveURL(/.*admin/)

    const logoutButton = this.page.locator('a[href="/logout"]')
    await expect(logoutButton).toBeVisible()
  }

  async create(title, overview, company, releaseYear) {
    await this.page.locator('a[href$="register"]').click()

    // Buscar o elemento pela Label
    // await this.page.getByLabel('Titulo do filme').fill(title)

    await this.page.locator('#title').fill(title)
    await this.page.locator('#overview').fill(overview)

    await this.page.locator('#select_company_id .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: company })
      .click()

    await this.page.locator('#select_year .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: releaseYear.toString() })
      .click()

    await this.page.getByRole('button', { name: 'Cadastrar' }).click()
  }
}
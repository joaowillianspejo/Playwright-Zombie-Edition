import { expect } from '@playwright/test';

export class Movies {
  constructor(page) {
    this.page = page
  }

  async goForm() {
    await this.page.locator('a[href$="register"]').click()
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click()
  }

  async create(movie) {
    await this.goForm()

    // Buscar o elemento pela Label
    // await this.page.getByLabel('Titulo do filme').fill(title)

    await this.page.locator('#title').fill(movie.title)
    await this.page.locator('#overview').fill(movie.overview)

    await this.page.locator('#select_company_id .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: movie.company })
      .click()

    await this.page.locator('#select_year .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: movie.release_year.toString() })
      .click()

    await this.page.locator('input[name="cover"]')
      .setInputFiles('tests/support/fixtures/' + movie.cover)
    if (movie.featured) {
      await this.page.locator('.featured .react-switch').click()
    }

    await this.submit()
  }

  async findMovie(title) {
    await this.page.locator('.actions input[placeholder="Busque pelo nome"]').fill(title)
    await this.page.locator('button[type="submit"]').click()

    await expect(this.page.locator('.title')).toHaveText(title)
  }

  async removeMovie(title) {
    await this.findMovie(title)

    await this.page.locator('.remove-item button').click()
    await this.page.locator('.tooltip .confirm-removal').click()
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}
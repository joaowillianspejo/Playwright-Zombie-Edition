import { expect } from '@playwright/test';

export class TVShows {
  constructor(page) {
    this.page = page
  }

  async goForm() {
    await this.page.locator('.navbar a[href$="tvshows"]').click()
    await this.page.locator('.actions a[href$="register"]').click()
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Cadastrar' }).click()
  }

  async create(tvshow) {
    await this.goForm()

    await this.page.locator('#title').fill(tvshow.title)
    await this.page.locator('#overview').fill(tvshow.overview)

    await this.page.locator('#select_company_id .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: tvshow.company })
      .click()

    await this.page.locator('#select_year .react-select__indicator').click()
    await this.page.locator('.react-select__option')
      .filter({ hasText: tvshow.release_year.toString() })
      .click()

    await this.page.locator('#seasons').fill(tvshow.seasons.toString())

    await this.page.locator('input[name="cover"]')
      .setInputFiles('tests/support/fixtures/' + tvshow.cover)

    if (tvshow.featured) {
      await this.page.locator('.featured .react-switch').click()
    }

    await this.submit()
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}
import { expect } from '@playwright/test';

export class TVShows {
  constructor(page) {
    this.page = page
  }

  async go() {
    await this.page.locator('.navbar a[href$="tvshows"]').click()
  }

  async goForm() {
    await this.go()
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

  async search(target) {
    await this.go()

    await this.page.locator('.actions input[placeholder="Busque pelo nome"]').fill(target)
    await this.page.locator('.actions button[type="submit"]').click()

    const rows = await this.page.getByRole('row')

    const count = await rows.count()

    for (let i = 0; i < count; i++) {
      await expect(rows.nth(i)).toContainText(target, { ignoreCase: true })
    }
  }

  async findTVShowByName(tvshow) {
    await this.go()

    await this.page.locator('.actions input[placeholder="Busque pelo nome"]').fill(tvshow.title)
    await this.page.locator('.actions button[type="submit"]').click()

    await expect(this.page.locator('.title')).toContainText(`${tvshow.title}${tvshow.seasons}`)
  }

  async removeTVShow(tvshow) {
    await this.findTVShowByName(tvshow)

    await this.page.locator('.remove-item button').click()
    await this.page.locator('.tooltip .confirm-removal').click()
  }

  async alertHaveText(target) {
    await expect(this.page.locator('.alert')).toHaveText(target)
  }
}
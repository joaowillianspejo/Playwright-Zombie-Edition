import { expect } from '@playwright/test';

export class Toast {

  constructor(page) {
    this.page = page
  }

  async haveText(message) {

    // Capturar html da página    
    // await page.getByText('seus dados conosco').click()
    // const content = await page.content()
    // console.log(content)

    const toast = this.page.locator('.toast')

    await expect(toast).toHaveText(message)
    await expect(toast).toBeHidden({ timeout: 5000 })
  }
}
import { expect } from '@playwright/test';

export class Modal {

  constructor(page) {
    this.page = page
  }

  async haveText(message) {

    // Capturar html da página    
    // await page.getByText('seus dados conosco').click()
    // const content = await page.content()
    // console.log(content)

    const element = this.page.locator('.swal2-html-container')

    await expect(element).toHaveText(message)
  }
}
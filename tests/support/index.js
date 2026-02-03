const { test: base, expect } = require('@playwright/test')

import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage'
import { MoviesPage } from '../pages/MoviesPage'
import { Toast } from '../pages/Components'

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }
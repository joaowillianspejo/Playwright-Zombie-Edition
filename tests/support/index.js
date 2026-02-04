const { test: base, expect } = require('@playwright/test')

import { Leads } from './actions/Leads';
import { Login } from './actions/Login'
import { Movies } from './actions/Movies'
import { Toast } from './actions/Components'

const test = base.extend({
    page: async ({ page }, use) => {

        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }
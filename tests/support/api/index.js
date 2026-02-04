import { expect } from '@playwright/test'

import { executeSQL } from '../database'

export class Api {
  constructor(request) {
    this.request = request
    this.token = undefined
  }

  async setToken() {
    const newSession = await this.request.post('http://localhost:3333/sessions', {
      data: {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
      }
    })

    await expect(newSession.status()).toBe(200)

    const body = await newSession.json()
    this.token = body.token
  }

  async postMovie(movie) {

    // const queryResult = await executeSQL(`SELECT id FROM companies WHERE name = '${movie.company}'`)

    const response = await this.request.post('http://localhost:3333/movies', {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: 'multipart/form-data',
        Accept: 'application/json, text/plain, */*'
      },

      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: '339960f8-e1ce-4b1b-b72f-8c58d28d0cac', // queryResult.rows[0].id,
        release_year: movie.release_year,
        featured: movie.featured
      }
    })
  }
}
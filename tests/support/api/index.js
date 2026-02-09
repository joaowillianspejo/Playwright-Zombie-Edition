import { expect } from '@playwright/test'
import 'dotenv/config'

// import { executeSQL } from '../database'

export class Api {
  constructor(request) {
    this.baseAPI = process.env.BASE_API
    this.request = request
    this.token = undefined
  }

  async setToken() {
    const newSession = await this.request.post(this.baseAPI + '/sessions', {
      data: {
        email: 'admin@zombieplus.com',
        password: 'pwd123'
      }
    })

    await expect(newSession.status()).toBe(200)

    const body = await newSession.json()
    this.token = body.token
  }

  async getCompanyIdByName(companyName){    
    const response = await this.request.get(this.baseAPI + '/companies', {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      params: {
        name: companyName
      }
    })
    
    await expect(response.status()).toBe(200)

    const body = await response.json()
    
    return body.data[0].id
  }

  async postMovie(movie) {

    // Buscar o ID da distribuidora via banco de dados
    // const queryResult = await executeSQL(`SELECT id FROM companies WHERE name = '${movie.company}'`)
    // const companyId = queryResult.rows[0].id

    const companyId = await this.getCompanyIdByName(movie.company)

    const response = await this.request.post(this.baseAPI + '/movies', {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: 'multipart/form-data',
        Accept: 'application/json, text/plain, */*'
      },

      multipart: {
        title: movie.title,
        overview: movie.overview,
        company_id: companyId,
        release_year: movie.release_year,
        featured: movie.featured
      }
    })

    expect(response.status()).toBe(201)
  }

  async postTVShow(tvshow) {
    const companyId = await this.getCompanyIdByName(tvshow.company)

    const response = await this.request.post(this.baseAPI + '/tvshows', {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ContentType: 'multipart/form-data',
        Accept: 'application/json, text/plain, */*'
      },

      multipart: {
        title: tvshow.title,
        overview: tvshow.overview,
        company_id: companyId,
        release_year: tvshow.release_year,
        seasons: tvshow.seasons,
        featured: tvshow.featured
      }
    })

    expect(response.status()).toBe(201)
  }
}
import axios from 'axios'

/**
 * Defines the base url and headers for http calls
 */

const Service = axios.create({
  baseURL: '/',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default {
  async getFacets () {
    return Service.get('facetter')
      .then(response => {
        return response.data
      })
  },

  async getFacet (uuid) {
    return Service.get(`facetter/${uuid}`)
      .then(response => {
        return response.data
      })
  },

  async getClass (uuid) {
    return Service.get(`klasser/${uuid}`)
      .then(response => {
        return response.data
      })
  },

  async addClass (uuid, payload) {
    return Service.post(`klasser/${uuid}`, payload)
      .then(response => {
        return response.data
      })
  },

  async deleteClass (uuid) {
    return Service.delete(`klasser/${uuid}`)
      .then(response => {
        return response.data
      })
  }
}

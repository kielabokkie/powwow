import env from './../.env'

export default {
  authHeaders: function () {
    const headers = {}

    headers['Accept'] = 'application/json'
    headers['X-Api-Key'] = env.API_KEY

    return headers
  }
}

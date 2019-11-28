// import something here

// "async" is optional
import axios from 'axios'
import { http } from '../setting.json'
export default async ({ app, router, Vue }) => {
  // something to do
  const $ajax = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? http.production.baseURL : http.dev.baseURL,
    timeout: 600000
  })
  Vue.prototype.$axios = $ajax
  Vue.prototype.$http = {
    get (url) {
      return $ajax.get(url).then(res => res.data)
    },
    post (url, data) {
      return $ajax.post(url, data).then(res => res.data)
    }
  }
}

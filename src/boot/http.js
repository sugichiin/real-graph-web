// import something here

// "async" is optional
import { ajax } from '../util.js'
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$http = ajax
}

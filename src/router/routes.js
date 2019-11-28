
const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'execute', path: '/execute', component: () => import('pages/Execute.vue') },
      { name: 'upload', path: '/upload', component: () => import('pages/Upload.vue') },
      { name: 'tutorial', path: '/', component: () => import('pages/Tutorial.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    name: 'unknown',
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

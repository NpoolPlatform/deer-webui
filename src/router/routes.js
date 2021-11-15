
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'good',
        component: () => import('pages/Good.vue'),
        query: { goodId: '' }
      },
      {
        path:'generateOrder',
        component: () => import('pages/GenerateOrder.vue'),
        query: { goodId: '' }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }, {
        path: 'good',
        component: () => import('pages/Good.vue'),
        query: { goodId: '' }
      }, {
        path:'createOrder',
        component: () => import('pages/CreateOrder.vue'),
        query: { goodId: '' }
      }, {
        path:'payment',
        component: () => import('pages/Payment.vue'),
        query: {
          orderId: '',
          goodId: ''
        }
      }, {
        path:'signin',
        component: () => import('pages/Signin.vue'),
        query: {
          by: 'email'
        }
      }, {
        path:'signup',
        component: () => import('pages/Signup.vue'),
        query: {
          by: 'email'
        }
      }, {
        path:'dashboard',
        component: () => import('pages/Dashboard.vue'),
        query: {
          userId: ''
        }
      }, {
        path:'payDone',
        component: () => import('pages/PayDone.vue'),
        query: {
          orderId: '',
          paymentId: '',
          goodId: ''
        }
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

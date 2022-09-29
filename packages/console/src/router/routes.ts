import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Login', component: () => import('pages/CLogin/CLogin.vue') },
      {
        path: '/Contact',
        component: () => import('pages/CContact/CContact.vue')
      },
      { path: '/News', component: () => import('pages/CNews/CNews.vue') },
      {
        path: '/Account',
        component: () => import('pages/CAccount/CAccount.vue')
      },
      { path: '/Terms', component: () => import('pages/CTerms/CTerms.vue') }
    ]
  },

  { path: '/dev', component: () => import('pages/DevPage/DevPage.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

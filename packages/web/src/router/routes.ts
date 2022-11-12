import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/WTop/WTop.vue')
      },
      {
        path: '/Menu',
        component: () => import('pages/WMenu/WMenu.vue')
      },
      {
        path: '/NewsList',
        component: () => import('pages/WNewsList/WNewsList.vue')
      },
      {
        name: 'NewsDetails',
        path: '/NewsDetails/:targetIndex/:targetId',
        component: () => import('pages/WNewsDetails/WNewsDetails.vue')
      },
      {
        path: '/Storeinfo',
        component: () => import('pages/WStoreinfo/WStoreinfo.vue')
      },
      {
        path: '/Recruit',
        component: () => import('pages/WRecruit/WRecruit.vue')
      },
      {
        path: '/Contact',
        component: () => import('pages/WContact/WContact.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

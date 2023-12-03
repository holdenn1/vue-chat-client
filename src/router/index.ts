import SignInPage from '@/pages/SignInPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import MainPage from '@/pages/MainPage.vue'
import MainLayout from 'components/Layouts/MainLayout.vue'

import NotFound from 'components/errors/NotFound.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { useUserStore } from '@/store/userStore'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: { noAuth: true },
      children: [
        {
          path: '',
          name: 'sign-in',
          component: SignInPage,
          meta: { noAuth: true }
        },
        {
          path: 'sign-up',
          name: 'sign-up',
          component: SignUpPage,
          meta: { noAuth: true }
        },
        {
          path: 'chats',
          name: 'chats',
          component: MainPage,
        }
      ]
    },
    {
      path: '/:notFound',
      component: NotFound
    }
  ]
})

// router.beforeEach(async (to) => {
//   if (useUserStore().userState.user === null && !to.meta.noAuth) {
//     return { name: 'home' }
//   }
// })

export default router

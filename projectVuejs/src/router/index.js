import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultComponent from '../components/DefaultComponent.vue'
import Index from '@/admin/index.vue'
import store from '@/store'
import { onMounted } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultComponent,
      children: [
          {
            path: '/',
            name: 'home',
            component: HomeView
          },
          {
            path: '/account',
            name: 'account',
            component: () => import('../components/Account.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: '/notebook',
            name: 'notebook',
            component: () => import('../components/NoteBook.vue')
          },
          {
            path: '/topic/:id',
            name: 'topic',
            component: () => import('../components/Topic.vue')
          },
          {
            path: '/conversation',
            name: 'conversation',
            component: () => import('../components/conversation.vue')
        },
          {
            path: '/word-active',
            name: 'wordactive',
            component: () => import('../components/WordActive.vue')
        },
        {
            path: '/exception',
            name: 'exception',
            component: () => import('../components/Exception.vue')
        },
        
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginView.vue')
    },
    {
      path: '/learning/:id',
      name: 'learning',
      component: () => import('../views/LearningVocab.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      component: Index,
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' }, 
      children: [
        {
          path: '/admin',
          name: 'admin',
          component: () => import('../admin/StatisticalReport.vue'),
          
        },
        {
          path: '/admin/user',
          name: 'adminUser',
          component: () => import('../admin/AdminUser.vue'),
          
        },
         {
          path: '/admin/course',
          name: 'adminCourse',
           component: () => import('../admin/AdminCourse.vue'),
          
        },
          {
          path: '/admin/topic',
          name: 'adminTopic',
            component: () => import('../admin/AdminTopics.vue'),
          
        },
           {
          path: '/admin/vocab',
          name: 'adminVocab',
             component: () => import('../admin/AdminVocab.vue'),
          
        },
      ]
    },
    {
      path: '/:catchAll(.*)', // Bắt tất cả các route không khớp
      name: 'not-found',
      beforeEnter: (to, from, next) => {
        // Bạn có thể thực hiện chuyển hướng đến một route khác
        // Hoặc hiển thị một thông báo trực tiếp trong modal, console log, v.v.
        console.warn("Page not found!");
        next({ name: 'home' }); // Chuyển hướng về trang home
      }
    } 
  ]
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('authtoken') 
  const user = store.getters.getMember
    if(to.matched.some(record => record.meta.requiresAuth)){
      if (!token) {
        sessionStorage.removeItem('authtoken'); 
        store.dispatch('openAuthModal')
        next({ name: 'home' }) 
      }
      if (to.meta.role && user.role != to.meta.role) {
        console.warn(`Unauthorized access. Required role: ${to.meta.role}`);
        return next({ name: 'not-found' }); // Chuyển hướng về home nếu không đủ quyền
      }
      else {
          next() 
      }
    }else{
      next()
    }
})

onMounted(async () => {
  await store.dispatch('fetchMember')
})

export default router

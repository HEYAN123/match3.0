import Vue from 'vue'
import Router from 'vue-router'
import NewsManager from '@/components/NewsManager'
import Login from '@/components/Login'
import Sign from '@/components/Sign'
import Student from '@/components/Student'
import Teacher from '@/components/Teacher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/sign',
      name: 'Sign',
      component: Sign
    }, {
      path: '/student',
      name: 'Student',
      component: Student
    }, {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher
    }, {
      path: '/newsmanage',
      name: 'NewsManager',
      component: NewsManager
    }
  
  ]
})

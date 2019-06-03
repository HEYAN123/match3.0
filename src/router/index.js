import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Sign from '@/components/Sign'
import Student from '@/components/Student'
import Admin from '@/components/Admin'
import Ejudge from '@/components/Ejudge'
import Tjudge from '@/components/Tjudge'

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
      path: '/admin',
      name: 'Admin',
      component: Admin
    }, {
      path: '/ejudge',
      name: 'Ejudge',
      component: Ejudge
    }, {
      path: '/tjudge',
      name: 'Tjudge',
      component: Tjudge
    }, 
  ]
})

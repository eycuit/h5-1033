import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/components/register/index'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login/login'], resolve)
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => require(['@/components/index/index'], resolve)
        },
        {
            path: '/invite',
            name: 'invite',
            component: resolve => require(['@/components/invite/index'], resolve)
        },
        {
            path: '/team',
            name: 'team',
            component: resolve => require(['@/components/team/index'], resolve)
        },
        {
            path: '/customer',
            name: 'customer',
            component: resolve => require(['@/components/customer/index'], resolve)
        },

        {
            path: '/*',
            redirect: '/register'
        },
    ]
})

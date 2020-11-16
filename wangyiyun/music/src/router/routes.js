export const routes = [
    {
        path:'/',
        redirect:'/song'
    },
    {
        path: '/search',  //搜索
        name: 'Search',
        component: () => import('../views/Search.vue')
    },
    {
        path: '/song',    
        name: 'Song',
        component: () => import('../views/Song.vue')
    },
    {
        path: '/rank',
        name: 'Rank',
        component: () => import('../views/Rank.vue')
    },
    {
        path: '/plist',
        name: 'Plist',
        component: () => import('../views/Plist.vue')
    },
    {
        path: '/autoPlay',
        name: 'AutoPlay',
        component: () => import('../views/AutoPlay.vue')
    },
    {
        path: '/singer',
        name: 'Singer',
        component: () => import('../views/Singer.vue')
    },
    {
        path: '/fineDetail/:aid/:img/:name',
        name: 'FineDetail',
        component: () => import('../views/FineDetail.vue')
    }
]
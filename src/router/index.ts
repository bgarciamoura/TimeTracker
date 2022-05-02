import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Tarefas from '@/views/Tarefas/index.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Tarefas,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router };

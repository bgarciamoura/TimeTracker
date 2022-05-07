import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Projetos from '@/views/Projetos/index.vue';
import Tarefas from '@/views/Tarefas/index.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Tarefas',
		component: Tarefas,
	},
	{
		path: '/projetos',
		name: 'Projetos',
		component: Projetos,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export { router };

import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';

import Formulario from '@/views/Projetos/Formulario.vue';
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
	{
		path: '/projetos/novo',
		name: 'Novo Projeto',
		component: Formulario,
	},
	{
		path: '/projetos/:id',
		name: 'Editar Projetos',
		component: Formulario,
		props: true,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export { router };

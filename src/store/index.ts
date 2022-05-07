import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore as vuexUseStore } from 'vuex';

import { ProjectState, projectModule } from './modules/project';
import { TasksState, tasksModule } from './modules/tasks';
import { NOTIFICAR } from './mutation-types';
import { INotificacao } from '@/interfaces/INotificacao';

export interface State {
	notificacoes: INotificacao[];
	project: ProjectState;
	task: TasksState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		task: {
			tasks: [],
		},
		notificacoes: [],
		project: {
			projects: [],
		},
	},
	mutations: {
		[NOTIFICAR]: (state, notificacao: INotificacao) => {
			notificacao.id = new Date().getTime();
			state.notificacoes.push(notificacao);

			setTimeout(() => {
				state.notificacoes = state.notificacoes.filter(
					(notificacao) => notificacao.id !== notificacao.id
				);
			}, 3000);
		},
	},
	actions: {},
	modules: {
		project: projectModule,
		task: tasksModule,
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}

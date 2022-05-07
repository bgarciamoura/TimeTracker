import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore as vuexUseStore } from 'vuex';

import {
	ALTERAR_TAREFA,
	CADASTRAR_TAREFA,
	OBTER_TAREFAS,
} from './action-types';
import { ProjectState, projectModule } from './modules/project';
import {
	ADICIONAR_TAREFA,
	ALTERA_TAREFA,
	DEFINIR_TAREFAS,
	NOTIFICAR,
} from './mutation-types';
import { clienteHttp } from '@/http';
import { INotificacao } from '@/interfaces/INotificacao';
import { ITarefa } from '@/interfaces/ITarefa';

export interface State {
	tarefas: ITarefa[];
	notificacoes: INotificacao[];
	project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		tarefas: [],
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
		[DEFINIR_TAREFAS]: (state, tarefas: ITarefa[]) => {
			state.tarefas = tarefas;
		},
		[ADICIONAR_TAREFA]: (state, tarefa: ITarefa) => {
			state.tarefas.push(tarefa);
		},
		[ALTERA_TAREFA]: (state, tarefa: ITarefa) => {
			const index = state.tarefas.findIndex(
				(tar) => tar.id === tarefa.id
			);
			state.tarefas[index] = tarefa;
		},
	},
	actions: {
		[OBTER_TAREFAS]({ commit }): void {
			clienteHttp.get('/tarefas').then((response) => {
				commit(DEFINIR_TAREFAS, response.data);
			});
		},
		async [CADASTRAR_TAREFA](
			contexto,
			tarefa: ITarefa
		): Promise<void> {
			const response = await clienteHttp.post(
				'/tarefas',
				tarefa
			);
			contexto.commit(ADICIONAR_TAREFA, response.data);
		},
		async [ALTERAR_TAREFA](
			contexto,
			tarefa: ITarefa
		): Promise<void> {
			await clienteHttp
				.put(`/tarefas/${tarefa.id}`, tarefa)
				.then((response) => {
					contexto.commit(ALTERA_TAREFA, response.data);
				});
		},
	},
	modules: {
		project: projectModule,
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}

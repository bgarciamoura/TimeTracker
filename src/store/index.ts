import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore as vuexUseStore } from 'vuex';

import { OBTER_PROJETOS } from './action-types';
import {
	ADD_PROJETO,
	ALTERAR_PROJETO,
	NOTIFICAR,
	REMOVER_PROJETO,
} from './mutation-types';
import { clienteHttp } from '@/http';
import { INotificacao } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';

interface State {
	projetos: IProjeto[];
	notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projetos: [],
		notificacoes: [],
	},
	mutations: {
		[ADD_PROJETO]: (state, nomeDoProjeto: string) => {
			const projeto = {
				id: new Date().toISOString(),
				nome: nomeDoProjeto,
			} as IProjeto;
			state.projetos.push(projeto);
		},
		[ALTERAR_PROJETO]: (state, projeto: IProjeto) => {
			const index = state.projetos.findIndex(
				(proj) => proj.id === projeto.id
			);
			state.projetos[index] = projeto;
		},
		[REMOVER_PROJETO]: (state, idDoProjeto: string) => {
			state.projetos = state.projetos.filter(
				(projeto) => projeto.id !== idDoProjeto
			);
		},
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
	actions: {
		[OBTER_PROJETOS]({ commit }) {
			clienteHttp.get('/projetos').then((response) => {
				commit(ADD_PROJETO, response.data);
			});
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}

import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore as vuexUseStore } from 'vuex';

import { OBTER_PROJETOS } from './action-types';
import {
	ADD_PROJETO,
	ALTERAR_PROJETO,
	REMOVER_PROJETO,
} from './mutation-types';
import { clienteHttp } from '@/http';
import IProjeto from '@/interfaces/IProjeto';

interface State {
	projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projetos: [],
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

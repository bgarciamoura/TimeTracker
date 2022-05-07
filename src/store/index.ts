import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { useStore as vuexUseStore } from 'vuex';
import { createStore } from 'vuex';

import {
	ADD_PROJETO,
	ALTERAR_PROJETO,
	REMOVER_PROJETO,
} from './mutation-types';
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
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}

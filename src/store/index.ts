import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore } from 'vuex';

import IProjeto from '@/interfaces/IProjeto';

interface State {
	projetos: IProjeto[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projetos: [
			{
				id: new Date().toISOString(),
				nome: 'Projeto 1',
			},
			{
				id: new Date().toISOString(),
				nome: 'Projeto 2',
			},
			{
				id: new Date().toISOString(),
				nome: 'Projeto 3',
			},
		],
	},
});

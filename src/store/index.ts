import { AxiosResponse } from 'axios';
import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore as vuexUseStore } from 'vuex';

import {
	ALTERAR_PROJETOS,
	CADASTRAR_PROJETO,
	CADASTRAR_TAREFA,
	OBTER_PROJETOS,
	OBTER_TAREFAS,
	REMOVER_PROJETOS,
} from './action-types';
import {
	ADD_PROJETO,
	ADICIONAR_TAREFA,
	ALTERAR_PROJETO,
	DEFINIR_PROJETOS,
	DEFINIR_TAREFAS,
	NOTIFICAR,
	REMOVER_PROJETO,
} from './mutation-types';
import { clienteHttp } from '@/http';
import { INotificacao } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';
import { ITarefa } from '@/interfaces/ITarefa';

interface State {
	projetos: IProjeto[];
	tarefas: ITarefa[];
	notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		projetos: [],
		tarefas: [],
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
		[DEFINIR_PROJETOS]: (state, projetos: IProjeto[]) => {
			state.projetos = projetos;
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
		[DEFINIR_TAREFAS]: (state, tarefas: ITarefa[]) => {
			state.tarefas = tarefas;
		},
		[ADICIONAR_TAREFA]: (state, tarefa: ITarefa) => {
			state.tarefas.push(tarefa);
		},
	},
	actions: {
		[OBTER_PROJETOS]({ commit }): void {
			clienteHttp.get('/projetos').then((response) => {
				commit(DEFINIR_PROJETOS, response.data);
			});
		},
		[CADASTRAR_PROJETO](
			contexto,
			nomeDoProjeto: string
		): Promise<AxiosResponse> {
			return clienteHttp.post('/projetos', {
				nome: nomeDoProjeto,
			});
		},
		[ALTERAR_PROJETOS](
			contexto,
			projeto: IProjeto
		): Promise<AxiosResponse> {
			return clienteHttp.put(
				`/projetos/${projeto.id}`,
				projeto
			);
		},
		[REMOVER_PROJETOS]({ commit }, id: string): void {
			clienteHttp.delete(`/projetos/${id}`).then(() => {
				commit(REMOVER_PROJETO, id);
			});
		},
		[OBTER_TAREFAS]({ commit }): void {
			clienteHttp.get('/tarefas').then((response) => {
				commit(DEFINIR_TAREFAS, response.data);
			});
		},
		[CADASTRAR_TAREFA](contexto, tarefa: ITarefa): Promise<void> {
			return clienteHttp
				.post('/tarefas', tarefa)
				.then((response) => {
					contexto.commit(ADICIONAR_TAREFA, response.data);
				});
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}

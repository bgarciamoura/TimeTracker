import { AxiosResponse } from 'axios';
import type { Module } from 'vuex';

import { clienteHttp } from '@/http';
import IProjeto from '@/interfaces/IProjeto';
import { State } from '@/store';
import {
	ALTERAR_PROJETOS,
	CADASTRAR_PROJETO,
	OBTER_PROJETOS,
	REMOVER_PROJETOS,
} from '@/store/action-types';
import {
	ADD_PROJETO,
	ALTERAR_PROJETO,
	DEFINIR_PROJETOS,
	REMOVER_PROJETO,
} from '@/store/mutation-types';

interface ProjectState {
	projects: IProjeto[];
}

const projectModule: Module<ProjectState, State> = {
	mutations: {
		[ADD_PROJETO]: (state, nomeDoProjeto: string) => {
			const projeto = {
				id: new Date().toISOString(),
				nome: nomeDoProjeto,
			} as IProjeto;
			state.projects.push(projeto);
		},
		[ALTERAR_PROJETO]: (state, projeto: IProjeto) => {
			const index = state.projects.findIndex(
				(proj) => proj.id === projeto.id
			);
			state.projects[index] = projeto;
		},
		[REMOVER_PROJETO]: (state, idDoProjeto: string) => {
			state.projects = state.projects.filter(
				(projeto) => projeto.id !== idDoProjeto
			);
		},
		[DEFINIR_PROJETOS]: (state, projetos: IProjeto[]) => {
			state.projects = projetos;
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
	},
};

export { projectModule, ProjectState };

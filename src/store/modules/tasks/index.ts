import type { Module } from 'vuex';

import { clienteHttp } from '@/http';
import { ITarefa } from '@/interfaces/ITarefa';
import { State } from '@/store';
import {
	ALTERAR_TAREFA,
	CADASTRAR_TAREFA,
	OBTER_TAREFAS,
} from '@/store/action-types';
import {
	ADICIONAR_TAREFA,
	ALTERA_TAREFA,
	DEFINIR_TAREFAS,
} from '@/store/mutation-types';

interface TasksState {
	tasks: ITarefa[];
}

const tasksModule: Module<TasksState, State> = {
	mutations: {
		[DEFINIR_TAREFAS]: (state, tarefas: ITarefa[]) => {
			state.tasks = tarefas;
		},
		[ADICIONAR_TAREFA]: (state, tarefa: ITarefa) => {
			state.tasks.push(tarefa);
		},
		[ALTERA_TAREFA]: (state, tarefa: ITarefa) => {
			const index = state.tasks.findIndex(
				(t) => t.id === tarefa.id
			);
			state.tasks[index] = tarefa;
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
};

export { tasksModule, TasksState };

<template>
	<formulario-tempo @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<div class="field">
			<p class="control has-icons-left">
				<input
					type="text"
					class="input"
					placeholder="Digite para filtrar"
					v-model="filtro"
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-search"></i>
				</span>
			</p>
		</div>
		<tarefa
			v-for="(tarefa, index) in tarefas"
			:key="index"
			:tarefa="tarefa"
			@aoTarefaClicada="selecionarTarefa"
		/>
		<box v-if="listaEstaVazia"
			>Você não está muito produtivo hoje! 🙁</box
		>
		<modal :mostrarModal="tarefaSelecionada != null">
			<template v-slot:cabecalho>
				<p class="modal-card-title">
					Editando a tarefa
					{{
						tarefaSelecionada?.descricao ||
						'Tarefa sem descrição'
					}}
				</p>
				<button
					class="delete"
					aria-label="close"
					@click="fecharModal"
				></button>
			</template>
			<template v-slot:corpo>
				<div class="field">
					<label
						for="descricaoDaTarefa"
						class="label"
					>
						Descricao
					</label>
					<input
						type="text"
						id="descricaoDaTarefa"
						class="input"
						v-model="tarefaSelecionada.descricao"
					/>
				</div>
			</template>
			<template v-slot:rodape>
				<button
					class="button is-success"
					@click="alterarTarefa"
				>
					Salvar Alterações
				</button>
				<button
					@click="fecharModal"
					class="button"
				>
					Cancelar
				</button>
			</template>
		</modal>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent, ref, watchEffect } from 'vue';

	import Box from '../../components/Box.vue';
	import FormularioTempo from '../../components/Formulario.vue';
	import Modal from '../../components/Modal.vue';
	import Tarefa from '../../components/Tarefa.vue';
	import { ITarefa } from '@/interfaces/ITarefa';
	import { useStore } from '@/store';
	import {
		ALTERAR_TAREFA,
		CADASTRAR_TAREFA,
		OBTER_PROJETOS,
		OBTER_TAREFAS,
	} from '@/store/action-types';

	export default defineComponent({
		name: 'Tarefas',
		components: {
			FormularioTempo,
			Tarefa,
			Box,
			Modal,
		},
		setup() {
			const store = useStore();
			store.dispatch(OBTER_TAREFAS);
			store.dispatch(OBTER_PROJETOS);

			const filtro = ref('');

			watchEffect(() => {
				store.dispatch(OBTER_TAREFAS, filtro.value);
			});

			return {
				store,
				tarefas: computed(() => store.state.task.tasks),
				filtro,
			};
		},
		data() {
			return {
				tarefaSelecionada: null as null | ITarefa,
			};
		},
		computed: {
			listaEstaVazia(): boolean {
				return this.tarefas.length === 0;
			},
		},
		methods: {
			salvarTarefa(tarefa: ITarefa): void {
				this.store.dispatch(CADASTRAR_TAREFA, tarefa);
			},
			selecionarTarefa(tarefa: ITarefa): void {
				this.tarefaSelecionada = tarefa;
				console.log(this.tarefaSelecionada.descricao);
			},
			fecharModal(): void {
				this.tarefaSelecionada = null;
			},
			alterarTarefa(): void {
				this.store
					.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
					.then(() => {
						this.fecharModal();
					});
			},
		},
	});
</script>

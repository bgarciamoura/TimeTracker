<template>
	<formulario-tempo @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<tarefa
			v-for="(tarefa, index) in tarefas"
			:key="index"
			:tarefa="tarefa"
			@aoTarefaClicada="selecionarTarefa"
		/>
		<box v-if="listaEstaVazia"
			>Você não está muito produtivo hoje! 🙁</box
		>
	</div>
	<div
		class="modal"
		:class="{ 'is-active': tarefaSelecionada }"
		v-if="tarefaSelecionada"
	>
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
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
			</header>
			<section class="modal-card-body">
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
			</section>
			<footer class="modal-card-foot">
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
			</footer>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from 'vue';

	import Box from '../../components/Box.vue';
	import FormularioTempo from '../../components/Formulario.vue';
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
		},
		setup() {
			const store = useStore();
			store.dispatch(OBTER_TAREFAS);
			store.dispatch(OBTER_PROJETOS);
			const tarefas = computed(() => store.state.tarefas);
			return {
				store,
				tarefas,
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

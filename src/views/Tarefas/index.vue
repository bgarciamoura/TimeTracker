<template>
	<formulario-tempo @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<tarefa
			v-for="(tarefa, index) in tarefas"
			:key="index"
			:tarefa="tarefa"
		/>
		<box v-if="listaEstaVazia"
			>Você não está muito produtivo hoje! 🙁</box
		>
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
		computed: {
			listaEstaVazia(): boolean {
				return this.tarefas.length === 0;
			},
		},
		methods: {
			salvarTarefa(tarefa: ITarefa): void {
				this.store.dispatch(CADASTRAR_TAREFA, tarefa);
			},
		},
	});
</script>

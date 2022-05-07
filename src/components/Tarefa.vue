<template>
	<Box>
		<div
			class="columns clicavel"
			@click="tarefaClicada"
		>
			<div class="column is-4">
				{{ tarefa.descricao || 'Tarefa sem descrição' }}
			</div>
			<div class="column is-3">
				{{ tarefa.projeto?.nome || 'Tarefa sem projeto' }}
			</div>
			<div class="column">
				<cronometro-segundos
					:tempoEmSegundos="tarefa.duracaoEmSegundos"
				/>
			</div>
		</div>
	</Box>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import type { PropType } from 'vue';

	import { ITarefa } from '../interfaces/ITarefa';
	import Box from './Box.vue';
	import CronometroSegundos from './Cronometro.vue';

	export default defineComponent({
		name: 'Tarefa',
		emits: ['aoTarefaClicada'],
		props: {
			tarefa: {
				type: Object as PropType<ITarefa>,
				required: true,
			},
		},
		components: { CronometroSegundos, Box },
		methods: {
			tarefaClicada(): void {
				this.$emit('aoTarefaClicada', this.tarefa);
			},
		},
	});
</script>
<style scoped>
	.clicavel {
		cursor: pointer;
	}
</style>

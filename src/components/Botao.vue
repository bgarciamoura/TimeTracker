<template>
	<button
		class="button"
		@click="clickHandler"
		:disabled="cronometroContando"
	>
		<span class="icon">
			<i :class="icone"></i>
		</span>
		<span>{{ textoDoBotao }}</span>
	</button>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Botao',
		emits: ['botaoClicado'],
		props: {
			cronometroContando: {
				type: Boolean,
				default: false,
			},
			textoDoBotao: {
				type: String,
				default: '',
			},
			icone: {
				type: String,
				default: '',
			},
		},
		methods: {
			clickHandler(): void {
				this.$emit('botaoClicado', this.cronometroContando);
			},
		},
	});
</script>

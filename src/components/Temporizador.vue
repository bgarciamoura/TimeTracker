<template>
	<div
		class="is-flex is-align-items-center is-justify-content-space-between"
	>
		<cronometro-segundos :tempoEmSegundos="tempoEmSegundos" />
		<botao
			textoDoBotao="play"
			:cronometroContando="cronometroContando"
			@botaoClicado="iniciar"
			icone="fas fa-play"
		/>
		<botao
			textoDoBotao="stop"
			:cronometroContando="!cronometroContando"
			@botaoClicado="finalizar"
			icone="fas fa-stop"
		/>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import Botao from './Botao.vue';
	import CronometroSegundos from './Cronometro.vue';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { notificacaoMixin } from '@/mixins/notificar';
	import { useStore } from '@/store';

	export default defineComponent({
		name: 'Temporizador',
		components: {
			CronometroSegundos,
			Botao,
		},
		props: {
			existeTarefa: {
				type: Boolean,
				default: false,
			},
		},
		emits: ['temporizadorFinalizado'],
		setup() {
			return {
				store: useStore(),
			};
		},
		mixins: [notificacaoMixin],
		data() {
			return {
				tempoEmSegundos: 0,
				temporizador: 0,
				cronometroContando: false,
			};
		},
		methods: {
			iniciar() {
				if (!this.existeTarefa) {
					this.notificar(
						'Atenção',
						'Você deve digitar uma tarefa antes de iniciar o cronômetro!',
						TipoNotificacao.ATENCAO
					);

					return;
				}
				this.cronometroContando = !this.cronometroContando;
				this.temporizador = setInterval(() => {
					this.tempoEmSegundos += 1;
				}, 1000);
			},
			finalizar() {
				this.cronometroContando = !this.cronometroContando;
				this.$emit(
					'temporizadorFinalizado',
					this.tempoEmSegundos
				);
				clearInterval(this.temporizador);
				this.tempoEmSegundos = 0;
			},
		},
	});
</script>

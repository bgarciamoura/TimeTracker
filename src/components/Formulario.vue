<template>
	<div class="box formulario">
		<div class="columns">
			<div
				class="column is-5"
				role="form"
				aria-label="Formulário para criação de uma nova tarefa"
			>
				<input
					type="text"
					class="input"
					placeholder="Qual tarefa você deseja iniciar?"
					v-model="tarefa"
				/>
			</div>
			<div class="column is-4">
				<div class="select">
					<select v-model="idProjeto">
						<option value="">Selecione o Projeto</option>
						<option
							:value="projeto.id"
							:key="projeto.id"
							v-for="projeto in projetos"
						>
							{{ projeto.nome }}
						</option>
					</select>
				</div>
			</div>
			<div class="column">
				<temporizador
					@temporizadorFinalizado="finalizarTarefa"
					:existeTarefa="existeTarefa"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { computed, defineComponent } from 'vue';
	import { useStore } from 'vuex';

	import Temporizador from './Temporizador.vue';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { key } from '@/store';
	import { NOTIFICAR } from '@/store/mutation-types';

	export default defineComponent({
		name: 'FormularioTempo',
		components: {
			Temporizador,
		},
		emits: ['aoSalvarTarefa'],
		data() {
			return {
				tarefa: '',
				idProjeto: '',
			};
		},
		computed: {
			existeTarefa(): boolean {
				return this.tarefa === '' ? false : true;
			},
		},
		methods: {
			finalizarTarefa(tempoDecorrido: number): void {
				const projeto = this.projetos.find(
					(projeto) => projeto.id === this.idProjeto
				);

				if (!projeto) {
					this.store.commit(NOTIFICAR, {
						titulo: 'Atenção',
						texto: 'Você deve selecionar um projeto antes de parar o tempo!',
						tipo: TipoNotificacao.ATENCAO,
					});

					return;
				}

				this.$emit('aoSalvarTarefa', {
					duracaoEmSegundos: tempoDecorrido,
					descricao: this.tarefa,
					projeto,
				});
				this.tarefa = '';
			},
		},
		setup() {
			const store = useStore(key);
			return {
				projetos: computed(() => store.state.projetos),
				store,
			};
		},
	});
</script>

<style>
	.formulario {
		color: var(--text-color);
		background-color: var(--primary-background-color);
	}
</style>

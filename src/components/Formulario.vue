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
					v-model="descricao"
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
	import { computed, defineComponent, ref } from 'vue';
	import { useStore } from 'vuex';

	import Temporizador from './Temporizador.vue';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { notificacaoMixin } from '@/mixins/notificar';
	import { key } from '@/store';

	export default defineComponent({
		name: 'FormularioTempo',
		components: {
			Temporizador,
		},
		emits: ['aoSalvarTarefa'],
		data() {
			return {
				tarefa: '',
			};
		},
		computed: {
			existeTarefa(): boolean {
				return this.tarefa === '' ? false : true;
			},
		},
		methods: {},
		setup(props, context) {
			const { emit } = context;
			const store = useStore(key);

			const descricao = ref('');
			const idProjeto = ref('');
			const projetos = computed(
				() => store.state.project.projects
			);

			const finalizarTarefa = (
				tempoDecorrido: number
			): void => {
				const projeto = projetos.value.find(
					(projeto) => projeto.id === idProjeto.value
				);

				if (!projeto) {
					notificacaoMixin.methods.notificar(
						'Atenção',
						'Você deve selecionar um projeto antes de parar o tempo!',
						TipoNotificacao.ATENCAO
					);

					return;
				}

				emit('aoSalvarTarefa', {
					duracaoEmSegundos: tempoDecorrido,
					descricao: descricao.value,
					projeto,
				});
				descricao.value = '';
			};

			return {
				descricao,
				idProjeto,
				projetos,
				store,
				finalizarTarefa,
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

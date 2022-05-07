<template>
	<section class="projetos">
		<form @submit.prevent="salvar">
			<div class="field">
				<label
					for="nomeDoProjeto"
					class="label"
				>
					Nome do Projeto
				</label>
				<input
					type="text"
					id="nomeDoProjeto"
					class="input"
					v-model="nomeDoProjeto"
				/>
			</div>
			<div class="field">
				<button
					class="button"
					type="submit"
				>
					Salvar
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	import { useNotificador } from '@/hooks/notificador';
	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { useStore } from '@/store';
	import {
		ALTERAR_PROJETOS,
		CADASTRAR_PROJETO,
	} from '@/store/action-types';

	export default defineComponent({
		name: 'Formulario',
		props: {
			id: {
				type: String,
			},
		},
		data() {
			return {
				nomeDoProjeto: '',
			};
		},
		mounted() {
			if (this.id) {
				const projeto =
					this.store.state.project.projects.find(
						(projeto) => {
							return projeto.id == this.id;
						}
					);
				this.nomeDoProjeto = projeto?.nome || '';
			}
		},
		methods: {
			salvar() {
				if (this.nomeDoProjeto) {
					if (this.id) {
						this.store
							.dispatch(ALTERAR_PROJETOS, {
								id: this.id,
								nome: this.nomeDoProjeto,
							})
							.then(() => {
								this.handleSuccessNotification();
							});
					} else {
						this.store
							.dispatch(
								CADASTRAR_PROJETO,
								this.nomeDoProjeto
							)
							.then(() => {
								this.handleSuccessNotification();
							});
					}
				} else {
					this.notificar(
						TipoNotificacao.ATENCAO,
						'Atenção',
						'Preencha o nome do projeto'
					);
				}
			},
			handleSuccessNotification() {
				this.nomeDoProjeto = '';

				this.notificar(
					TipoNotificacao.SUCESSO,
					'Projeto salvo',
					'O projeto foi salvo com sucesso'
				);
				this.$router.push('/projetos');
			},
		},
		setup() {
			const store = useStore();
			const { notificar } = useNotificador();
			return {
				store,
				notificar,
			};
		},
	});
</script>

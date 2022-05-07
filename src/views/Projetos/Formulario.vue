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

	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { notificacaoMixin } from '@/mixins/notificar';
	import { useStore } from '@/store';
	import {
		ADD_PROJETO,
		ALTERAR_PROJETO,
	} from '@/store/mutation-types';

	export default defineComponent({
		name: 'Formulario',
		props: {
			id: {
				type: String,
			},
		},
		mixins: [notificacaoMixin],
		data() {
			return {
				nomeDoProjeto: '',
			};
		},
		mounted() {
			if (this.id) {
				const projeto = useStore().state.projetos.find(
					(projeto) => projeto.id === this.id
				);
				this.nomeDoProjeto = projeto?.nome || '';
			}
		},
		methods: {
			salvar() {
				if (this.nomeDoProjeto) {
					if (this.id) {
						this.store.commit(ALTERAR_PROJETO, {
							id: this.id,
							nome: this.nomeDoProjeto,
						});
					} else {
						this.store.commit(
							ADD_PROJETO,
							this.nomeDoProjeto
						);
					}
					this.nomeDoProjeto = '';

					this.notificar(
						'Projeto salvo',
						'O projeto foi salvo com sucesso',
						TipoNotificacao.SUCESSO
					);
					this.$router.push('/projetos');
				} else {
					this.notificar(
						'Atenção',
						'Preencha o nome do projeto',
						TipoNotificacao.ATENCAO
					);
				}
			},
		},
		setup() {
			const store = useStore();
			return {
				store,
			};
		},
	});
</script>

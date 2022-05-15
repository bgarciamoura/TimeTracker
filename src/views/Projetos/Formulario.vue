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
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

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
		setup(props) {
			const id = ref(props.id);
			const nomeDoProjeto = ref('');
			const store = useStore();
			const router = useRouter();
			const { notificar } = useNotificador();

			if (id.value) {
				const projeto = store.state.project.projects.find(
					(projeto) => {
						return projeto.id == id.value;
					}
				);
				nomeDoProjeto.value = projeto?.nome || '';
			}

			const salvar = () => {
				if (nomeDoProjeto.value) {
					if (id.value) {
						store
							.dispatch(ALTERAR_PROJETOS, {
								id: id.value,
								nome: nomeDoProjeto.value,
							})
							.then(() => {
								handleSuccessNotification();
							});
					} else {
						store
							.dispatch(
								CADASTRAR_PROJETO,
								nomeDoProjeto.value
							)
							.then(() => {
								handleSuccessNotification();
							});
					}
				} else {
					notificar(
						TipoNotificacao.ATENCAO,
						'Atenção',
						'Preencha o nome do projeto'
					);
				}
			};

			const handleSuccessNotification = () => {
				nomeDoProjeto.value = '';

				notificar(
					TipoNotificacao.SUCESSO,
					'Projeto salvo',
					'O projeto foi salvo com sucesso'
				);
				router.push('/projetos');
			};

			return {
				nomeDoProjeto,
				salvar,
			};
		},
	});
</script>

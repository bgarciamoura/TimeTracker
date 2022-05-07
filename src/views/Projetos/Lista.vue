<template>
	<section class="projetos">
		<router-link
			to="/projetos/novo"
			class="button"
		>
			<span class="icon is-small">
				<i class="fas fa-plus"></i>
			</span>
			<span>Novo Projeto</span>
		</router-link>
		<table class="table is-fullwidth">
			<thead>
				<tr>
					<th>ID</th>
					<th>Nome</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="projeto in projetos"
					:key="projeto.id"
				>
					<td>{{ projeto.id }}</td>
					<td>{{ projeto.nome }}</td>
					<td>
						<router-link
							:to="`/projetos/${projeto.id}`"
							class="button"
						>
							<span class="icon is-small">
								<i class="fas fa-pencil-alt"></i>
							</span>
						</router-link>
						<button
							class="button ml-2 is-danger"
							@click="excluir(projeto.id)"
						>
							<span class="icon is-small">
								<i class="fas fa-trash"></i>
							</span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
</template>

<script lang="ts">
	import { computed, defineComponent } from 'vue';

	import { TipoNotificacao } from '@/interfaces/INotificacao';
	import { notificacaoMixin } from '@/mixins/notificar';
	import { store, useStore } from '@/store';
	import { OBTER_PROJETOS } from '@/store/action-types';
	import { REMOVER_PROJETO } from '@/store/mutation-types';

	export default defineComponent({
		name: 'Lista',
		components: {},
		setup() {
			const store = useStore();
			store.dispatch(OBTER_PROJETOS);
			return {
				store,
				projetos: computed(() => store.state.projetos),
			};
		},
		mixins: [notificacaoMixin],
		methods: {
			excluir(id: string) {
				this.store.commit(REMOVER_PROJETO, id);
				this.notificar(
					'Projeto apagado',
					'O projeto foi apagado',
					TipoNotificacao.SUCESSO
				);
			},
		},
	});
</script>

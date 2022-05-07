<template>
	<section class="projetos">
		<h1 class="title">Projetos</h1>
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

	import { useStore } from '@/store';

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
						this.store.commit('ALTERAR_PROJETO', {
							id: this.id,
							nome: this.nomeDoProjeto,
						});
					} else {
						this.store.commit(
							'ADD_PROJETO',
							this.nomeDoProjeto
						);
					}
					this.nomeDoProjeto = '';
					this.$router.push('/projetos');
				} else {
					alert('Preencha o nome do projeto');
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

<style scoped>
	.projetos {
		padding: 1.25rem;
	}
</style>

<template>
	<header>
		<div class="header-container">
			<h1>
				<img
					src="../assets/logo.png"
					alt=""
				/>
			</h1>
			<nav class="panel mt-5">
				<ul>
					<li>
						<router-link
							to="/"
							class="link"
						>
							<i class="fas fa-tasks"></i>
							Tarefas
						</router-link>
					</li>
					<li>
						<router-link
							to="/projetos"
							class="link"
						>
							<i class="fas fa-project-diagram"></i>
							Projetos
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
		<button
			class="button"
			@click="alterarTema"
		>
			{{ textoDoBotao }}
		</button>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'BarraLateral',
		emits: ['temaAlterado'],
		data() {
			return {
				modoEscuroAtivo: false,
			};
		},
		computed: {
			textoDoBotao(): string {
				return this.modoEscuroAtivo
					? 'Ativar modo claro'
					: 'Ativar modo escuro';
			},
		},
		methods: {
			alterarTema() {
				this.modoEscuroAtivo = !this.modoEscuroAtivo;
				this.$emit('temaAlterado', this.modoEscuroAtivo);
			},
		},
	});
</script>

<style scoped>
	header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #0d3b66;
		width: 100%;
		height: 100%;
		min-height: 100vh;
	}
	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
		}
	}

	.panel li {
		margin: 8px 0;
	}

	.link {
		color: #fff;
	}

	.link:hover {
		color: #faf0ca;
	}

	.link.router-link-active {
		color: #faf0ca;
	}
</style>

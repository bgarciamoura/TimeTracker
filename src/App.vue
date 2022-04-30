<template>
    <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <barra-lateral @temaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter conteudo">
            <formulario-tempo @aoSalvarTarefa="salvarTarefa" />
            <div class="lista">
                <tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
                <box v-if="listaEstaVazia">Você não está muito produtivo hoje! 🙁</box>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import BarraLateral from './components/BarraLateral.vue';
    import FormularioTempo from './components/Formulario.vue';
    import Tarefa from './components/Tarefa.vue';
    import Box from './components/Box.vue';
    import { ITarefa } from './interfaces/ITarefa';

    export default defineComponent({
        name: 'App',
        components: {
            BarraLateral,
            FormularioTempo,
            Tarefa,
            Box,
        },
        data() {
            return {
                tarefas: [] as ITarefa[],
                modoEscuroAtivo: false,
            };
        },
        computed: {
            listaEstaVazia(): boolean {
                return this.tarefas.length === 0;
            },
        },
        methods: {
            salvarTarefa(tarefa: ITarefa): void {
                this.tarefas.push(tarefa);
            },
            trocarTema(temaEscuroAtivado: boolean): void {
                this.modoEscuroAtivo = temaEscuroAtivado;
            },
        },
    });
</script>

<style>
    .lista {
        display: flex;
        flex-direction: column;
        padding: 1.25rem;
    }

    main {
      --primary-background-color: #fff,
      --text-color: #000,
    }

    main.dark-mode {
      --primary-background-color: #2b2d42,
      --text-color: #ddd,
    }

    .conteudo {
      background-color: var(--primary-background-color) !important;
    }
</style>

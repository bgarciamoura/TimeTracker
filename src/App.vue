<template>
    <main class="columns is-gapless is-multiline">
        <div class="column is-one-quarter">
            <barra-lateral />
        </div>
        <div class="column is-three-quarter">
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
        },
    });
</script>

<style>
    .lista {
        display: flex;
        flex-direction: column;
        padding: 1.25rem;
    }
</style>

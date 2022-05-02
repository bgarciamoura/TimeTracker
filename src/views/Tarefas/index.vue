<template>
    <formulario-tempo @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <box v-if="listaEstaVazia">Você não está muito produtivo hoje! 🙁</box>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import FormularioTempo from '../../components/Formulario.vue';
    import Tarefa from '../../components/Tarefa.vue';
    import Box from '../../components/Box.vue';
    import { ITarefa } from '../../interfaces/ITarefa';

    export default defineComponent({
        name: 'Tarefas',
        components: {
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

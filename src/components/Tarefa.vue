<template>
    <Box>
        <div class="columns">
            <div class="column is-11">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column">
                <cronometro-segundos :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import CronometroSegundos from './Cronometro.vue';
    import Box from './Box.vue';
    import { ITarefa } from '../interfaces/ITarefa';

    export default defineComponent({
        name: 'Tarefa',
        props: {
            tarefa: {
                type: Object as PropType<ITarefa>,
                required: true,
            },
        },
        components: { CronometroSegundos, Box },
    });
</script>

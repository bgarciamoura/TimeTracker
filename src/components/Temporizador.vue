<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <cronometro-segundos :tempoEmSegundos="tempoEmSegundos" />
        <botao
            textoDoBotao="play"
            :cronometroContando="cronometroContando"
            @botaoClicado="iniciar"
            icone="fas fa-play"
        />
        <botao
            textoDoBotao="stop"
            :cronometroContando="!cronometroContando"
            @botaoClicado="finalizar"
            icone="fas fa-stop"
        />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import CronometroSegundos from './Cronometro.vue';
    import Botao from './Botao.vue';

    export default defineComponent({
        name: 'Temporizador',
        components: {
            CronometroSegundos,
            Botao,
        },
        props: {
            existeTarefa: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['temporizadorFinalizado'],
        data() {
            return {
                tempoEmSegundos: 0,
                temporizador: 0,
                cronometroContando: false,
            };
        },
        methods: {
            iniciar() {
                console.log(this.existeTarefa);
                if (!this.existeTarefa) {
                    alert('Você deve digitar uma tarefa antes de iniciar o cronômetro!');
                    return;
                }
                this.cronometroContando = !this.cronometroContando;
                this.temporizador = setInterval(() => {
                    this.tempoEmSegundos += 1;
                }, 1000);
            },
            finalizar() {
                this.cronometroContando = !this.cronometroContando;
                clearInterval(this.temporizador);
                this.$emit('temporizadorFinalizado', this.tempoEmSegundos);
                this.tempoEmSegundos = 0;
            },
        },
    });
</script>

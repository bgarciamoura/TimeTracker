<template>
    <header>
        <h1><img src="../assets/logo.png" alt="" /></h1>
        <button class="button" @click="alterarTema">{{ textoDoBotao }}</button>
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
                return this.modoEscuroAtivo ? 'Ativar modo claro' : 'Ativar modo escuro';
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
</style>

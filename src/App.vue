<template>
    <main class="columns is-gapless is-multiline" :class="{ 'dark-mode': modoEscuroAtivo }">
        <div class="column is-one-quarter">
            <barra-lateral @temaAlterado="trocarTema" />
        </div>
        <div class="column is-three-quarter conteudo">
            <router-view></router-view>
        </div>
    </main>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import BarraLateral from './components/BarraLateral.vue';

    export default defineComponent({
        name: 'App',
        components: {
            BarraLateral,
        },
        data() {
            return {
                modoEscuroAtivo: false,
            };
        },
        methods: {
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

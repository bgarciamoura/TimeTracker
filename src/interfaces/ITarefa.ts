import IProjeto from './IProjeto';

interface ITarefa {
	id: number;
	descricao: string;
	duracaoEmSegundos: number;
	projeto: IProjeto;
}

export { ITarefa };

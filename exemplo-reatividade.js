/**
 * Exemplo em Vanilla JS do que é feito pelo Vue.js quando se usa o hook 'ref()'
 */

const projeto = {
	nome: 'Exemplo de Reatividade',
	descricao: 'Exemplo de Reatividade com Vue.js',
};

const proxy = new Proxy(projeto, {
	get(originalObject, propertyKey) {
		console.log(
			`Alguém pediu para acessar a chave ${propertyKey} do objeto ${originalObject}`
		);
		return originalObject[propertyKey];
	},
	set(originalObject, propertyKey, value) {
		console.log(
			`Alguém pediu para alterar a chave ${propertyKey} do objeto ${originalObject} para ${value}`
		);
		originalObject[propertyKey] = value;
	},
});

proxy.descricao = 'Nova descrição';

console.log(proxy.descricao);

/**
 * sempre que utilizamos o hook 'ref()' no Vue, o objeto que está sendo retornado para a nossa variável é um proxy e não o objeto original
 */

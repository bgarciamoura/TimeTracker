import { TipoNotificacao } from '@/interfaces/INotificacao';
import { store } from '@/store';
import { NOTIFICAR } from '@/store/mutation-types';

type Notificador = {
	notificar: (
		tipo: TipoNotificacao,
		titulo: string,
		texto: string
	) => void;
};

export const useNotificador = (): Notificador => {
	const notificar = (
		tipo: TipoNotificacao,
		titulo: string,
		texto: string
	): void => {
		store.commit(NOTIFICAR, {
			tipo,
			titulo,
			texto,
		});
	};

	return {
		notificar,
	};
};

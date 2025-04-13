import {logger} from "../utils.ts";

type AllowedOperations = 'delete' | 'deleteAll' | 'deleteNotIn' | 'insert' | 'set' | 'update';

export class UoW {
	private changes: Array<{
		execute: () => Promise<unknown>;
	}> = [];

	/**
	 * Регистрация операции с автодополнением и проверкой:
	 * 1. Операция должна быть в AllowedOperations
	 * 2. Метод должен существовать в репозитории
	 * 3. Параметры должны соответствовать сигнатуре метода
	 */
	registerOperation<
		K extends AllowedOperations,
		R extends { [P in K]: (...args: any[]) => Promise<any> } // Разрешаем любой возвращаемый тип
	>(
		operation: K,
		repo: R,
		...args: Parameters<R[K]>
	) {
		const method = repo[operation];
		if (typeof method !== 'function') {
			throw new Error(`Operation ${operation} not found in repository`);
		}

		this.changes.push({
			execute: async () => {
				console.time(`	${operation}_${repo.constructor.name}`);
				logger.debug(args, `Выполняю ${operation} в ${repo.constructor.name}`);
				await method.call(repo, ...args)
				console.timeEnd(`	${operation}_${repo.constructor.name}`);
			}
		});
	}

	async commit() {
		for (const change of this.changes) {
			await change.execute();
		}
	}
}
// Базовый интерфейс для сервисов с ограниченным доступом
import {UoW} from "./UnitOfWorks";
import {db, Transaction, DBConnection} from "../index";

// export interface ICommitable {
// 	commit(): Promise<void>;
// }

// Абстрактный класс для сервисов с UoW
export abstract class BaseService {
	protected uow: UoW;
	protected tx: DBConnection|Transaction

	protected constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		this.uow = uow || new UoW();
		this.tx = tx || db;
	}

	// Метод только для внутреннего использования
	protected async commitInternal(): Promise<void> {
		await this.uow.commit();
	}
}
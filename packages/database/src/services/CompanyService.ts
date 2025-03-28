import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection} from "../index";
import {CompanyRepository} from "../models/Company/repository";

export class CompanyService extends BaseService {
	private readonly companyRepository: CompanyRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.companyRepository = new CompanyRepository(tx)
	}
}
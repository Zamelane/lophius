import {UoW} from "./UnitOfWorks";
import {BaseService} from "./types";
import {db, Transaction, DBConnection, GenreRepository, PartialGenre} from "../index";
import { GenreModel } from "database/models/Genre/model";

export class GenreService extends BaseService {
	private readonly genreRepository: GenreRepository

	constructor(
		tx?: DBConnection|Transaction,
		uow?: UoW
	) {
		tx ??= db // Работаем напрямую с базой (во время сохранения заменить на транзакцию)
		super(tx, uow) // Инициализируем UnitOfWorks
		this.genreRepository = new GenreRepository(tx)
	}

	createIfNotExists(genre: PartialGenre) {
		const genreModel = new GenreModel(genre)
		this.uow.registerOperation('insert', this.genreRepository, genreModel)
		return genreModel
	}
}
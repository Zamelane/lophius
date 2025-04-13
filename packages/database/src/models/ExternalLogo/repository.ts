import {Transaction, DBConnection} from "../../index";
import {insertPoster} from "database/models/ExternalPoster/methods.ts";
import { deleteNotInLogos, insertLogo } from "./methods";

/**
 * @description Репозиторий для работы с моделью внешних логотипов
 */
export class ExternalLogoRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	deleteNotIn = deleteNotInLogos
	insert = insertLogo
}
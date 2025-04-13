import {Transaction, DBConnection} from "../../index";
import { findExternalImageByCredentials, insertExternalImage } from "./methods";

/**
 * @description Репозиторий для работы с моделью внешних изображений
 */
export class ExternalImageRepository {
	constructor(protected tx: DBConnection | Transaction) {}

	findByCredentials = findExternalImageByCredentials
	insert = insertExternalImage
	
}
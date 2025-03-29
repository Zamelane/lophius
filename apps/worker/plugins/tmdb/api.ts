import {PluginStorage} from "../../src/plugin-storage.ts";
import {getDataByStorage} from "@plugins/tmdb/utils.ts";
import {ParsedConfig} from "@plugins/tmdb/types.ts";
import {discoverMovie} from "@plugins/tmdb/client";
import {allFieldsDefined} from "@/interfaces";
import {saveMovies} from "@plugins/tmdb/savers.ts";

export async function moviesLibraryLoader(storage: PluginStorage) {
	const { movies, token, defaultLang } = await getDataByStorage(storage);

	if (movies.isFullParsed) {
		return;
	}

	await initializeFirstUpdateDate(storage, movies);
	await updateLastUpdateDate(storage, movies);

	await fetchAllMoviesWithPagination(storage, movies, token!);
}

// Инициализация даты первого обновления
async function initializeFirstUpdateDate(storage: PluginStorage, movies: ParsedConfig) {
	if (!movies.firstUpdateDate) {
		await storage.update({
			movies: {
				...movies,
				firstUpdateDate: new Date()
			}
		});
	}
}

// Обновление даты последнего запуска
async function updateLastUpdateDate(storage: PluginStorage, movies: ParsedConfig) {
	await storage.update({
		movies: {
			...movies,
			startLastUpdateDate: new Date()
		}
	});
}

// Основная логика парсинга с пагинацией
async function fetchAllMoviesWithPagination(storage: PluginStorage, movies: ParsedConfig, token: string) {
	let currentDate = movies.date;
	let lastKnownDate = movies.date_gte;
	let currentPage = movies.page;
	let hasMoreData = true;

	while (hasMoreData) {
		const { shouldContinue, newDate, newPage } = await processBatch(
			storage,
			currentDate,
			lastKnownDate,
			currentPage,
			token
		);

		if (!shouldContinue) {
			hasMoreData = false;
			await markParsingComplete(storage, movies);
			continue;
		}

		currentDate = newDate;
		currentPage = newPage;
	}
}

// Обработка одной пачки данных (до 500 страниц)
async function processBatch(
	storage: PluginStorage,
	date: string | null,
	date_gte: string | null,
	startPage: number,
	token: string
): Promise<{ shouldContinue: boolean; newDate: string | null; newPage: number }> {
	let currentDate = date;
	let currentPage = startPage;
	let lastItemDate = date_gte;

	for (; currentPage <= 500; currentPage++) {
		const result = await fetchMoviePage(token, currentPage, currentDate);

		if (!result.data?.results?.length) {
			return {
				shouldContinue: false,
				newDate: currentDate,
				newPage: currentPage
			};
		}

		await saveMovies(result.data, await storage.GetSourceId(), token, storage);
		lastItemDate = result.data.results[result.data.results.length - 1].release_date ?? null;

		await storage.update({
			movies: {
				date: currentDate,
				date_gte: lastItemDate,
				page: currentPage
			}
		});

		console.info(`Страница ${currentPage}/500 (${currentDate}/${lastItemDate}) извлечена`);
	}

	// Если дошли до 500 страниц, продолжаем со следующей даты
	return {
		shouldContinue: true,
		newDate: lastItemDate,
		newPage: 1
	};
}

// Запрос одной страницы фильмов
async function fetchMoviePage(token: string, page: number, date: string | null) {
	const { data, error } = await discoverMovie({
		auth: token,
		query: {
			page,
			sort_by: 'primary_release_date.asc',
			include_adult: true,
			include_video: true,
			"primary_release_date.gte": date ?? undefined
		}
	});

	if (error) {
		throw new Error(`Ошибка извлечения страницы: ${JSON.stringify(error)}`);
	}

	if (!data || !allFieldsDefined(data) || !allFieldsDefined(data.results)) {
		throw new Error(`Страница с фильмами вернула не все поля`);
	}

	return { data, error };
}

// Пометить парсинг как завершенный
async function markParsingComplete(storage: PluginStorage, movies: ParsedConfig) {
	await storage.update({
		movies: {
			...movies,
			isFullParsed: true,
			succesfullLastUpdateDate: movies.succesfullLastUpdateDate ?? new Date()
		}
	});
}
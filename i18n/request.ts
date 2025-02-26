import {cookies, headers} from "next/headers";
import {getRequestConfig} from "next-intl/server";

const localesSupported = ['ru', 'en'];

export default getRequestConfig(async () => {

	const { get: getHeader } = await headers();
	const { value: cookieLocale } = (await cookies()).get("NEXT_LOCALE") || {};
	const acceptLanguage = getHeader("accept-language") || "en";
	const detectedLocale = (cookieLocale || acceptLanguage).split(",")[0];

	const locale = localesSupported.includes(detectedLocale) ? detectedLocale : "en";

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default
	};
});
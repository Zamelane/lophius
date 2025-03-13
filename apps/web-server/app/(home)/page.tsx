import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(props: MetadataProps) {
	const t = await getTranslations({
		namespace: 'HomePage',
		locale: (await props.params).locale
	})

	return {
		title: t('title')
	}
}

export default async function HomePage() {
	return (
		<div>Home page</div>
	)
}
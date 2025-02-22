import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";

export async function generateMetadata({params : {locale}}: MetadataProps) {
	const t = await getTranslations({locale, namespace: 'HomePage'})

	return {
		title: t('title')
	}
}

export default function HomePage() {
	return (
		<div>Home page</div>
	)
}
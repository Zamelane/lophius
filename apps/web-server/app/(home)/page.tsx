import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";
import { Gallery } from "@/components/template-components";

export async function generateMetadata(props: MetadataProps) {
	const t = await getTranslations({
		locale: (await props.params).locale,
		namespace: 'HomePage'
	})

	return {
		title: t('title')
	}
}

export default async function HomePage() {
	return (
		<section>
			<Gallery title="Новинки"/>
		</section>
	)
}
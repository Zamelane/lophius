import {getUser} from "@/lib/dal";
import {MetadataProps} from "@/interfaces";
import {getTranslations} from "next-intl/server";

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
	const auth = await getUser()
	return (
		<>
			<div>Home page</div>
			<div>You nickname: {auth?.nickname}</div>
		</>
	)
}
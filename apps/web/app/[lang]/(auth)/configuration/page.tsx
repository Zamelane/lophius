import {Metadata} from "next";
import {ConfigurationView} from "@/views/configuration/view";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Первоначальная настройка"
	}
}

export default async function ServerConfigPage() {
	return (
		<ConfigurationView/>
	)
}
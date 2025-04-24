import {Metadata} from "next";
import { redirect } from "next/navigation";
import { getIsConfigured } from "@/lib/config";
import {ConfigurationView} from "@/views/configuration/view";

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Первоначальная настройка"
	}
}

export default async function ServerConfigPage() {
	if (getIsConfigured()) {
		return redirect('/')
	}
	return (
		<ConfigurationView/>
	)
}
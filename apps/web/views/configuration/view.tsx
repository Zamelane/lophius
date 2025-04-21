"use client"

import {useState} from "react";
import {Step, Stepper} from "@/views/configuration/stepper";
import {ReviewStep} from "@/views/configuration/review-step";
import {DatabaseConfigStep} from "@/views/configuration/database-config-step";
import {AccountCreationStep} from "@/views/configuration/account-creation-step";
import {UserIcon, ServerIcon, DatabaseIcon, ClipboardCheckIcon} from "lucide-react";
import {ServerConfigurationStep} from "@/views/configuration/server-configuration-step";

export function ConfigurationView() {
	const [currentStep, setCurrentStep] = useState(0)
	const [configData, setConfigData] = useState({
		//
		dbHost: process.env.DB_HOST ?? "127.0.0.1",
		dbName: process.env.DB_NAME ?? "lophius",
		dbPassword: process.env.DB_PASSWORD ?? "",
		dbPort: process.env.DB_PORT ?? "5432",
		dbUsername: process.env.DB_USER ?? "",

		//
		email: "",
		nickname: "",
		password: "",

		//
		publicUrl: process.env.PUBLIC_URL ?? "http://localhost:3000",
		maxUploadFileSize: process.env.MAX_FILE_SIZE ?? "7340032"
	})

	const updateFormData = (data: Partial<typeof configData>) => {
		setConfigData((prev) => ({...prev, ...data}))
	}

	const goToNextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1)
		}
	}

	const goToPreviousStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1)
		}
	}

	const steps: Step[] = [
		{
			component: <AccountCreationStep
				onNext={goToNextStep}
				configData={configData}
				updateFormData={updateFormData}
			/>,
			description: 'Используется для конфигурации сервера',
			icon: UserIcon,
			title: 'Аккаунт администратора'
		},
		{
			component: <DatabaseConfigStep
				onNext={goToNextStep}
				configData={configData}
				onPrevious={goToPreviousStep}
				updateFormData={updateFormData}
			/>,
			description: 'Данные для подключения к базе данных',
			icon: DatabaseIcon,
			title: 'Конфигурация базы данных'
		},
		{
			component: <ServerConfigurationStep
				onNext={goToNextStep}
				configData={configData}
				onPrevious={goToPreviousStep}
				updateFormData={updateFormData}
			/>,
			description: "Основные настройки для корректной работы",
			icon: ServerIcon,
			title: "Конфигурация сервера"
		},
		{
			component: <ReviewStep
				configData={configData}
				onPrevious={goToPreviousStep}
			/>,
			icon: ClipboardCheckIcon,
			title: "Подтверждение",
			description: "Проверьте данные и сохранитесь"
		}
	]

	return (
		<div className="flex flex-col gap-6 max-w-screen-lg">
			<Stepper steps={steps} stepIndex={currentStep}/>
		</div>
	)
}